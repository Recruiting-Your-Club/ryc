package com.ryc.api.v2.email.application;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.InterviewEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.evaluation.bussiness.InterviewService;
import com.ryc.api.v2.role.domain.enums.Role;

@Service
public class EmailService {

  private final String baseUri;
  private final String linkHtmlTemplate;
  private final InterviewService interviewService;
  private final EmailRepository emailRepository;

  public EmailService(
      @Value("${reservation.base-url}") String baseUri,
      InterviewService interviewService,
      EmailRepository emailRepository,
      ResourceLoader resourceLoader)
      throws IOException {
    this.baseUri = baseUri;
    this.interviewService = interviewService;
    this.emailRepository = emailRepository;

    Resource resource = resourceLoader.getResource("classpath:templates/interview-link.html");
    this.linkHtmlTemplate = Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);
  }

  @Transactional
  @HasRole(Role.MEMBER)
  public List<EmailSendResponse> createEmails(
      ClubRoleSecuredDto clubRoleSecuredDto,
      String adminId,
      String announcementId,
      EmailSendRequest body) {

    List<Email> emails =
        body.recipients().stream()
            .map(
                recipient ->
                    Email.initialize(
                        recipient, body.subject(), body.content(), announcementId, adminId))
            .toList();

    List<Email> savedEmails = emailRepository.saveAll(emails);
    return savedEmails.stream()
        .map(
            email ->
                EmailSendResponse.builder()
                    .emailId(email.id())
                    .status(email.status())
                    .statusUrl(String.format("api/v2/emails/%s/status", email.id()))
                    .build())
        .toList();
  }

  @Transactional
  @HasRole(Role.MEMBER)
  public List<EmailSendResponse> createInterviewDateEmails(
      ClubRoleSecuredDto clubRoleSecuredDto,
      String announcementId,
      InterviewEmailSendRequest body) {

    List<Email> emails =
        createEmailsWithEachLink(
            clubRoleSecuredDto.adminId(),
            announcementId,
            body.emailSendRequest().recipients(),
            body.emailSendRequest().subject(),
            body.emailSendRequest().content());

    interviewService.createInterview(
        clubRoleSecuredDto.adminId(), announcementId, body.numberOfPeopleByInterviewDates());

    List<Email> savedEmails = emailRepository.saveAll(emails);
    return savedEmails.stream()
        .map(
            email ->
                EmailSendResponse.builder()
                    .emailId(email.id())
                    .status(email.status())
                    .statusUrl(String.format("api/v2/emails/%s/status", email.id()))
                    .build())
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

  private List<Email> createEmailsWithEachLink(
      String adminId,
      String announcementId,
      List<String> recipients,
      String subject,
      String content) {
    List<Email> emails = new ArrayList<>();

    for (String recipient : recipients) {
      String link =
          String.format(
              "%s?admin-id=%s&announcement-id=%s&recipient=%s",
              baseUri, adminId, announcementId, recipient);
      String linkHtml = String.format(linkHtmlTemplate, link);

      emails.add(Email.initialize(recipient, subject, linkHtml + content, announcementId, adminId));
    }
    return emails;
  }
}
