package com.ryc.api.v2.email.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
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
  private final EmailRepository emailRepository;
  private final InterviewService interviewService;

  public EmailService(
      @Value("${reservation.base-url}") String baseUri,
      EmailRepository emailRepository,
      InterviewService interviewService) {
    this.baseUri = baseUri;
    this.emailRepository = emailRepository;
    this.interviewService = interviewService;
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

      String linkHtml =
          String.format(
              """
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #333;">📩 면접 일정 선택 안내</h2>
        <p style="font-size: 14px; color: #555;">
          아래 버튼을 클릭하여 면접 일정을 선택해주세요. 링크는 개인별로 생성된 전용 링크입니다.
        </p>
        <a href="%s" target="_blank" style="
            display: inline-block;
            padding: 12px 24px;
            margin-top: 10px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
        ">
          ✅ 면접 일정 선택하러 가기
        </a>
      </div>
      """,
              link);

      emails.add(Email.initialize(recipient, subject, linkHtml + content, announcementId, adminId));
    }
    return emails;
  }
}
