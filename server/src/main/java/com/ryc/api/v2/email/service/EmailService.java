package com.ryc.api.v2.email.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.domain.event.ApplicationSuccessEmailEvent;
import com.ryc.api.v2.email.domain.event.InterviewReservationEmailEvent;
import com.ryc.api.v2.email.domain.event.InterviewSlotEmailEvent;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;

@Service
public class EmailService {

  private final String baseUri;
  private final String linkHtmlTemplate;
  private final String interviewReservationHtmlTemplate;
  private final String applicationSubmittedHtmlTemplate;
  private final String ssocEmailId;
  private final EmailRepository emailRepository;

  public EmailService(
      @Value("${CLIENT_URL}") String baseUri,
      @Value("${SSOC_EMAIL_ID}") String ssocEmailId,
      EmailRepository emailRepository,
      ResourceLoader resourceLoader)
      throws IOException {
    this.baseUri = baseUri;
    this.emailRepository = emailRepository;
    this.ssocEmailId = ssocEmailId;

    Resource resource = resourceLoader.getResource("classpath:templates/interview-link.html");
    try (InputStream is = resource.getInputStream()) {
      this.linkHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    resource = resourceLoader.getResource("classpath:templates/interview-reservation.html");
    try (InputStream is = resource.getInputStream()) {
      this.interviewReservationHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    resource = resourceLoader.getResource("classpath:templates/application-submitted.html");
    try (InputStream is = resource.getInputStream()) {
      this.applicationSubmittedHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
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
    return savedEmails.stream()
        .map(
            email -> {
              String statusUrl = String.format("api/v2/emails/%s/status", email.getId());
              return EmailSendResponse.builder()
                  .emailId(email.getId())
                  .status(email.getStatus())
                  .statusUrl(statusUrl)
                  .build();
            })
        .toList();
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
  protected void createInterviewSlotEmails(InterviewSlotEmailEvent event) {
    List<Email> emails = new ArrayList<>();

    for (Applicant applicant : event.applicants()) {
      String link =
          String.format(
              "%s/clubs/%s/announcements/%s/applicants/%s/interview-reservations",
              baseUri, event.clubId(), event.announcementId(), applicant.getId());
      String content = String.format(linkHtmlTemplate, link) + event.content();

      emails.add(
          Email.initialize(
              event.adminId(),
              applicant.getEmail(),
              event.subject(),
              content,
              event.announcementId()));
    }

    emailRepository.saveAll(emails);
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

    createEmails(
        ssocEmailId, event.announcementId(), List.of(event.applicantEmail()), subject, content);
  }

  @Async
  @TransactionalEventListener
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  protected void createApplicationSuccessEmails(ApplicationSuccessEmailEvent event) {
    String subject = String.format("[지원서 접수 완료] %s 지원서가 정상적으로 접수되었습니다.", event.announcementTitle());
    String content =
        applicationSubmittedHtmlTemplate
            .replace("${applicantName}", event.applicantName())
            .replace("${announcementTitle}", event.announcementTitle())
            .replace(
                "${submittedDate}",
                event.submittedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

    createEmails(
        ssocEmailId, event.announcementId(), List.of(event.applicantEmail()), subject, content);
  }

  @EventListener
  @Transactional(propagation =  Propagation.MANDATORY)
  protected void handleAnnouncementDeletedEvent(AnnouncementDeletedEvent event) {
    event.announcementIds().stream()
        .filter(emailRepository::existsByAnnouncementId)
        .forEach(emailRepository::deleteAllByAnnouncementId);
  }

  @EventListener
  @Transactional(propagation =  Propagation.MANDATORY)
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    if (!emailRepository.existsByAdminId(event.adminId())) {
      return;
    }

    emailRepository.deleteAllByAdminId(event.adminId());
  }
}
