package com.ryc.api.v2.email.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.InterviewEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.interview.service.InterviewService;

@Service
public class EmailService {

  private final String baseUri;
  private final String linkHtmlTemplate;
  private final EmailRepository emailRepository;
  private final InterviewService interviewService;
  private final ApplicantRepository applicantRepository;

  public EmailService(
      @Value("${LOCAL_CLIENT_URL}") String baseUri,
      EmailRepository emailRepository,
      InterviewService interviewService,
      ApplicantRepository applicantRepository,
      ResourceLoader resourceLoader)
      throws IOException {
    this.baseUri = baseUri + "/reservation";
    this.emailRepository = emailRepository;
    this.interviewService = interviewService;
    this.applicantRepository = applicantRepository;

    Resource resource = resourceLoader.getResource("classpath:templates/interview-link.html");
    try (InputStream is = resource.getInputStream()) {
      this.linkHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }
  }

  @Transactional
  public List<EmailSendResponse> createEmails(
      String adminId, String clubId, String announcementId, EmailSendRequest body) {
    List<Email> emails =
        body.recipients().stream()
            .map(
                recipient ->
                    Email.initialize(
                        adminId, recipient, body.subject(), body.content(), clubId, announcementId))
            .toList();

    return saveAll(emails);
  }

  @Transactional
  public List<EmailSendResponse> createInterviewDateEmails(
      String adminId, String clubId, String announcementId, InterviewEmailSendRequest body) {

    interviewService.createInterviewSlot(
        adminId, announcementId, body.numberOfPeopleByInterviewDateRequests());

    List<String> applicantIds =
        applicantRepository.convertEmailsToIds(
            announcementId, body.emailSendRequest().recipients());

    List<Email> emails =
        createEmailsWithEachLink(
            clubId,
            adminId,
            announcementId,
            applicantIds,
            body.emailSendRequest().subject(),
            body.emailSendRequest().content());

    return saveAll(emails);
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

  private List<Email> createEmailsWithEachLink(
      String clubId,
      String adminId,
      String announcementId,
      List<String> recipientIds,
      String subject,
      String content) {
    List<Email> emails = new ArrayList<>();

    for (String recipient : recipientIds) {
      String link =
          String.format(
              "%s/clubs/%s/announcements/%s/applicants/%s/interview-reservations",
              baseUri, clubId, announcementId, recipient);
      String linkHtml = String.format(linkHtmlTemplate, link);

      emails.add(
          Email.initialize(
              adminId, recipient, subject, linkHtml + content, clubId, announcementId));
    }
    return emails;
  }

  private List<EmailSendResponse> saveAll(List<Email> emails) {
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
}
