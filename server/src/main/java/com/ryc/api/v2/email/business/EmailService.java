package com.ryc.api.v2.email.business;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.InterviewEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.evaluation.bussiness.InterviewService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

@Service
public class EmailService {

  private final String baseUri;
  private final String linkHtmlTemplate;
  private final EmailRepository emailRepository;
  private final InterviewService interviewService;

  public EmailService(
      @Value("${reservation.base-url}") String baseUri,
      EmailRepository emailRepository,
      InterviewService interviewService,
      ResourceLoader resourceLoader)
      throws IOException {
    this.baseUri = baseUri;
    this.emailRepository = emailRepository;
    this.interviewService = interviewService;

    Resource resource = resourceLoader.getResource("classpath:templates/interview-link.html");
    this.linkHtmlTemplate = Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);
  }

  @Transactional
  public List<EmailSendResponse> createEmails(
      CustomUserDetail userDetail, String announcementId, EmailSendRequest body) {

    List<Email> emails =
        createEmails(
            userDetail.getId(), announcementId, body.recipients(), body.subject(), body.content());

    List<Email> savedEmails = emailRepository.saveAll(emails);
    return savedEmails.stream().map(email -> new EmailSendResponse(email.id())).toList();
  }

  @Transactional
  public List<EmailSendResponse> createInterviewDateEmails(
      CustomUserDetail userDetail, String announcementId, InterviewEmailSendRequest body) {

    List<Email> emails =
        createEmailsWithEachLink(
            userDetail.getId(),
            announcementId,
            body.emailSendRequest().recipients(),
            body.emailSendRequest().subject(),
            body.emailSendRequest().content());

    interviewService.createInterview(
        userDetail.getId(), announcementId, body.numberOfPeopleByInterviewDates());

    List<Email> savedEmails = emailRepository.saveAll(emails);
    return savedEmails.stream().map(email -> new EmailSendResponse(email.id())).toList();
  }

  private List<Email> createEmails(
      String adminId,
      String announcementId,
      List<String> recipients,
      String subject,
      String content) {
    return recipients.stream()
        .map(recipient -> Email.initialize(recipient, subject, content, announcementId, adminId))
        .toList();
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
