package com.ryc.api.v2.email.business;

import java.util.List;

import jakarta.mail.MessagingException;

import org.springframework.stereotype.Service;

import com.ryc.api.v2.email.domain.Email;
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
      CustomUserDetail userDetail, String announcementId, EmailSendRequest body)
      throws MessagingException {
    List<Email> emails = emailService.createEmail(userDetail.getEmail(), announcementId, body);
    List<EmailSendResponse> responses = senderService.sendEmails(emails);

    emailService.saveEmails(emails);
    return responses;
  }

  public List<EmailSendResponse> sendAndCreateInterviewDates(
      CustomUserDetail userDetail, String announcementId, InterviewEmailSendRequest body)
      throws MessagingException {
    List<Email> emails =
        emailService.createEmail(userDetail.getId(), announcementId, body.emailSendRequest());
    List<Email> updatedEmails = emailService.updateEachEmailContent(emails);
    List<EmailSendResponse> responses = senderService.sendEmails(updatedEmails);

    interviewService.createInterview(body.numberOfPeopleByInterviewDates());
    emailService.saveEmails(updatedEmails);
    return responses;
  }
}
