package com.ryc.api.v2.email.business;

import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.email.domain.EmailStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.security.dto.CustomUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class EmailFacade {

  private final EmailSenderService senderService;
  private final EmailSaverService saverService;
  private final ClubService clubService;

  public List<EmailSendResponse> sendAndSaveEmails(
          CustomUserDetail userDetail, String clubId, EmailSendRequest body)
          throws AccessDeniedException {
    if (!clubService.isAdminInClub(userDetail.getId(), clubId)) {
      throw new AccessDeniedException("You do not have permission to send emails for this club.");
    }

    List<EmailSendResponse> responses = senderService.sendEmails(body);
    List<String> successfulRecipients = responses.stream()
            .filter(response -> response.emailStatus() == EmailStatus.SUCCESS)
            .map(EmailSendResponse::recipient)
            .toList();

    saverService.saveEmails(successfulRecipients, body.subject(), body.content());

    return responses;
  }
}
