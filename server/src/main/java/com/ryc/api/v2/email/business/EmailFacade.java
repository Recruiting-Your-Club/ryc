package com.ryc.api.v2.email.business;

import java.util.List;

import com.ryc.api.v2.email.domain.Email;
import jakarta.mail.MessagingException;

import org.springframework.stereotype.Service;

import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.InterviewEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.evaluation.bussiness.InterviewService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EmailFacade {

  private final EmailSenderService senderService;
  private final EmailService emailService;
  private final InterviewService interviewService;

  public List<EmailSendResponse> sendAndSaveEmails(
          CustomUserDetail userDetail, String announcementId, EmailSendRequest body) throws MessagingException {
    List<Email> emails = emailService.createEmail(userDetail.getEmail(), announcementId, body);
    List<EmailSendResponse> responses = senderService.sendEmails(emails);

    emailService.saveEmails(userDetail.getEmail(), announcementId, body.subject(), body.content(), responses);
    return responses;
  }

  public List<EmailSendResponse> sendAndCreateInterviewDates(
          CustomUserDetail userDetail, String announcementId, InterviewEmailSendRequest body)
          throws MessagingException {
    List<Email> emails = emailService.createEmail(userDetail.getEmail(), announcementId, body.emailSendRequest());
    List<Email> updatedEmails = emailService.updateEachEmailContent(emails);
    List<EmailSendResponse> responses = senderService.sendEmails(updatedEmails);

//    emailService.saveEmails(updatedEmails.);
    // 너무 중복 제거에 집중하고 있나.. 삽질을 너무 오랜시간동안 했음.. 내일 와서 다시
  }
}
