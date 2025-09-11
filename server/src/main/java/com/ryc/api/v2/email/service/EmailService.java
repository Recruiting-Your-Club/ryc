package com.ryc.api.v2.email.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.email.domain.event.ApplicationSuccessEmailEvent;
import com.ryc.api.v2.email.domain.event.InterviewReservationEmailEvent;
import com.ryc.api.v2.email.presentation.dto.request.InterviewSlotEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;

@Service
public class EmailService {

  private final String interviewLinkHtmlTemplate;
  private final String interviewReservationHtmlTemplate;
  private final String applicationSubmittedHtmlTemplate;
  private final String ssocId;

  private final EmailRepository emailRepository;
  private final ClubRepository clubRepository;
  private final ApplicantRepository applicantRepository;

  public EmailService(
      @Value("${SSOC_EMAIL_ID}") String ssocId,
      EmailRepository emailRepository,
      ClubRepository clubRepository,
      ApplicantRepository applicantRepository,
      ResourceLoader resourceLoader)
      throws IOException {
    this.emailRepository = emailRepository;
    this.clubRepository = clubRepository;
    this.applicantRepository = applicantRepository;
    this.ssocId = ssocId;

    this.interviewLinkHtmlTemplate =
        loadTemplate(resourceLoader, "classpath:templates/interview-link.html");
    this.interviewReservationHtmlTemplate =
        loadTemplate(resourceLoader, "classpath:templates/interview-reservation.html");
    this.applicationSubmittedHtmlTemplate =
        loadTemplate(resourceLoader, "classpath:templates/application-submitted.html");
  }

  private String loadTemplate(ResourceLoader resourceLoader, String path) throws IOException {
    Resource resource = resourceLoader.getResource(path);
    try (InputStream is = resource.getInputStream()) {
      return new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }
  }

  @Transactional
  public List<EmailSendResponse> createEmails(
      String adminId,
      String announcementId,
      List<String> recipients,
      String subject,
      String content) {
    List<Email> emails =
        recipients.stream()
            .map(
                recipient -> Email.initialize(adminId, recipient, subject, content, announcementId))
            .toList();

    List<Email> savedEmails = emailRepository.saveAll(emails);
    return savedEmails.stream().map(this::createEmailSendResponse).toList();
  }

  @Transactional
  public List<EmailSendResponse> createInterviewSlotEmails(
      String adminId, String clubId, String announcementId, InterviewSlotEmailSendRequest body) {

    Club club = clubRepository.findById(clubId);
    List<Applicant> applicants =
        applicantRepository.findAllByAnnouncementId(announcementId).stream()
            .filter(applicant -> applicant.getStatus() == ApplicantStatus.INTERVIEW_PENDING)
            .toList();

    List<Email> emails =
        applicants.stream()
            .map(
                applicant -> {
                  String content =
                      interviewLinkHtmlTemplate
                              .replace("${club-name}", club.getName())
                              .replace("${club-id}", club.getId())
                              .replace("${announcement-id}", announcementId)
                              .replace("${applicant-name}", applicant.getName())
                              .replace("${applicant-id}", applicant.getId())
                          + body.content();

                  return Email.initialize(
                      adminId, applicant.getEmail(), body.subject(), content, announcementId);
                })
            .toList();

    List<Email> savedEmails = emailRepository.saveAll(emails);
    return savedEmails.stream().map(this::createEmailSendResponse).toList();
  }

  @Transactional(readOnly = true)
  public List<Email> findPendingEmails() {
    return emailRepository.findPendingEmails(
        PageRequest.of(
            0, 50, Sort.by("createdAt").descending().and(Sort.by("retryCount").descending())));
  }

  @Transactional
  public void updateStatus(Email email, EmailSentStatus status) {
    Email updatedEmail = email.updateStatus(status);
    emailRepository.save(updatedEmail);
  }

  @Transactional
  public void incrementRetryCount(Email email) {
    Email updatedEmail = email.incrementRetryCount();
    emailRepository.save(updatedEmail);
  }

  @Async
  @TransactionalEventListener
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  protected void createInterviewReservationEmails(InterviewReservationEmailEvent event) {
    String subject = String.format("[면접 예약 완료] %s 면접 예약이 정상적으로 완료되었습니다.", event.clubName());
    String content =
        interviewReservationHtmlTemplate
            .replace("${clubName}", event.clubName())
            .replace("${applicantName}", event.applicantName())
            .replace("${date}", event.period().startDate().toLocalDate().toString())
            .replace("${startTime}", event.period().startDate().toLocalTime().toString())
            .replace("${endTime}", event.period().endDate().toLocalTime().toString());

    createEmails(ssocId, event.announcementId(), List.of(event.applicantEmail()), subject, content);
  }

  @Async
  @TransactionalEventListener
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  protected void createApplicationSuccessEmails(ApplicationSuccessEmailEvent event) {
    String subject = String.format("[지원서 접수 완료] %s 지원서가 정상적으로 접수되었습니다.", event.announcementTitle());
    String content =
        applicationSubmittedHtmlTemplate
            .replace("${clubName}", event.clubName())
            .replace("${applicantName}", event.applicantName())
            .replace("${announcementTitle}", event.announcementTitle())
            .replace(
                "${submittedDate}",
                event.submittedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

    createEmails(ssocId, event.announcementId(), List.of(event.applicantEmail()), subject, content);
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleAnnouncementDeletedEvent(AnnouncementDeletedEvent event) {
    event.announcementIds().stream()
        .filter(emailRepository::existsByAnnouncementId)
        .forEach(emailRepository::deleteAllByAnnouncementId);
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    if (!emailRepository.existsByAdminId(event.adminId())) {
      return;
    }

    emailRepository.deleteAllByAdminId(event.adminId());
  }

  private EmailSendResponse createEmailSendResponse(Email email) {
    String statusUrl = String.format("api/v2/emails/%s/status", email.getId());
    return EmailSendResponse.builder()
        .emailId(email.getId())
        .status(email.getStatus())
        .statusUrl(statusUrl)
        .build();
  }
}
