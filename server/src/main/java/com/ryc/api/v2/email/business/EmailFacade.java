package com.ryc.api.v2.email.business;

import java.util.List;

import jakarta.mail.MessagingException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.email.domain.EmailSentStatus;
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
  private final EmailHistoryService historyService;
  private final ClubService clubService;
  private final InterviewService interviewService;

  public List<EmailSendResponse> sendAndSaveEmails(
      CustomUserDetail userDetail, String clubId, EmailSendRequest body) throws MessagingException {
    if (!clubService.isAdminInClub(userDetail.getId(), clubId)) {
      throw new AccessDeniedException("You do not have permission to send emails for this club.");
    }

    List<EmailSendResponse> responses = senderService.sendEmails(body);
    List<String> successfulRecipients =
        responses.stream()
            .filter(response -> response.emailSentStatus() == EmailSentStatus.SUCCESS)
            .map(EmailSendResponse::recipient)
            .toList();

    historyService.saveEmails(
        successfulRecipients, body.subject(), body.content(), clubId, userDetail.getEmail());
    return responses;
  }

  public List<EmailSendResponse> sendAndCreateInterviewDates(
      CustomUserDetail userDetail, String clubId, InterviewEmailSendRequest body)
      throws MessagingException {
    List<EmailSendResponse> responses =
        sendAndSaveEmails(userDetail, clubId, body.emailSendRequest());
    interviewService.createInterview(body.numberOfPeopleByInterviewDates());
    return responses;
  }
}
