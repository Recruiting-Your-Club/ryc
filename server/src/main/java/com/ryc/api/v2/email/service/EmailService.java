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

import com.ryc.api.v2.Interview.service.InterviewService;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.InterviewEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.role.domain.enums.Role;

@Service
public class EmailService {

  private final String baseUri;
  private final String linkHtmlTemplate;
  private final EmailRepository emailRepository;
  private final InterviewService interviewService;

  public EmailService(
      @Value("${RESERVATION.BASE-URL.LOCAL}") String baseUri,
      EmailRepository emailRepository,
      InterviewService interviewService,
      ResourceLoader resourceLoader)
      throws IOException {
    this.baseUri = baseUri;
    this.emailRepository = emailRepository;
    this.interviewService = interviewService;

    Resource resource = resourceLoader.getResource("classpath:templates/interview-link.html");
    try (InputStream is = resource.getInputStream()) {
      this.linkHtmlTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }
  }

  @Transactional
  @HasRole(Role.MEMBER)
  public List<EmailSendResponse> createEmails(
      ClubRoleSecuredDto clubRoleSecuredDto, String announcementId, EmailSendRequest body) {

    List<Email> emails =
        body.recipients().stream()
            .map(
                recipient ->
                    Email.initialize(
                        clubRoleSecuredDto.adminId(),
                        recipient,
                        body.subject(),
                        body.content(),
                        announcementId))
            .toList();

    return saveAll(emails);
  }

  @Transactional
  @HasRole(Role.MEMBER)
  public List<EmailSendResponse> createInterviewDateEmails(
      ClubRoleSecuredDto clubRoleSecuredDto,
      String announcementId,
      InterviewEmailSendRequest body) {

    List<String> interviewSlotIds =
        interviewService.createInterviewSlot(
            clubRoleSecuredDto.adminId(),
            announcementId,
            body.numberOfPeopleByInterviewDateRequests());

    List<Email> emails =
        createEmailsWithEachLink(
            clubRoleSecuredDto.adminId(),
            announcementId,
            // TODO: recipients가 아닌, ApplicantService에서 지원자 ID 주입 필요
            body.emailSendRequest().recipients(),
            body.emailSendRequest().subject(),
            body.emailSendRequest().content(),
            interviewSlotIds);

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
      String adminId,
      String announcementId,
      List<String> recipientIds,
      String subject,
      String content,
      List<String> interviewSlotIds) {
    List<Email> emails = new ArrayList<>();

    for (String recipient : recipientIds) {
      String link =
          String.format("%s?announcement-id=%s&recipient=%s", baseUri, announcementId, recipient);
      String linkHtml = String.format(linkHtmlTemplate, link);

      emails.add(Email.initialize(adminId, recipient, subject, linkHtml + content, announcementId));
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
