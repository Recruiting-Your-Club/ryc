package com.ryc.api.v2.email.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.email.domain.event.InterviewReservationEmailEvent;
import com.ryc.api.v2.email.domain.event.InterviewSlotEmailEvent;

@Service
public class EmailService {

  private final String baseUri;
  private final String linkHtmlTemplate;
  private final String interviewReservationHtmlTemplate;
  private final EmailRepository emailRepository;

  public EmailService(
      @Value("${CLIENT_URL}") String baseUri,
      EmailRepository emailRepository,
      ResourceLoader resourceLoader)
      throws IOException {
    this.baseUri = baseUri;
    this.emailRepository = emailRepository;

    Resource resource = resourceLoader.getResource("classpath:templates/interview-link.html");
    try (InputStream is = resource.getInputStream()) {
      this.linkHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    resource = resourceLoader.getResource("classpath:templates/interview-reservation.html");
    try (InputStream is = resource.getInputStream()) {
      this.interviewReservationHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
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

  @Async
  @EventListener
  @Transactional
  protected void createInterviewEmails(InterviewSlotEmailEvent event) {
    List<Email> emails = new ArrayList<>();

    for (Applicant applicant : event.applicants()) {
      String htmlLink = createHtmlLink(event.clubId(), event.announcementId(), applicant.getId());

      emails.add(
          Email.initialize(
              event.adminId(),
              applicant.getEmail(),
              event.subject(),
              htmlLink + event.content(),
              event.announcementId()));
    }

    emailRepository.saveAll(emails);
  }

  @Async
  @EventListener
  @Transactional
  protected void createInterviewReservationEmails(InterviewReservationEmailEvent event) {
    String subject = String.format("[면접 예약 완료] %s 면접 예약이 정상적으로 완료되었습니다.", event.clubName());
    String content =
        interviewReservationHtmlTemplate
            .replace("${clubName}", event.clubName())
            .replace("${applicantName}", event.applicantName())
            .replace("${date}", event.period().startDate().toLocalDate().toString())
            .replace("${startTime}", event.period().startDate().toLocalTime().toString())
            .replace("${endTime}", event.period().endDate().toLocalTime().toString());

    createEmails(null, event.announcementId(), List.of(event.applicantEmail()), subject, content);
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

  @Transactional
  @EventListener
  protected void handleAnnouncementDeletedEvent(AnnouncementDeletedEvent event) {
    event.announcementIds().forEach(emailRepository::deleteAllByAnnouncementId);
  }

  @Transactional
  @EventListener
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    emailRepository.deleteAllByAdminId(event.adminId());
  }

  private String createHtmlLink(String clubId, String announcementId, String applicantId) {
    String link =
        String.format(
            "%s/clubs/%s/announcements/%s/applicants/%s/interview-reservations",
            baseUri, clubId, announcementId, applicantId);
    return String.format(linkHtmlTemplate, link);
  }
}
