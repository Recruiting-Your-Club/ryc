package com.ryc.api.v2.email.business;

import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.email.domain.EmailSentStatus;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

  @Value("${reservation.base-url}")
  private String baseUri;
  private final EmailRepository emailRepository;

  public List<Email> createEmail(String adminId, String announcementId, EmailSendRequest body) {
    return body.recipients().stream().map(recipient -> Email.initialize(recipient, body.subject(), body.content(), announcementId, adminId)).toList();
  }

  public List<Email> updateEachEmailContent(List<Email> emails) {

  }

  @Transactional
  public void saveEmails(String adminId, String announcementId, String subject, String content, List<EmailSendResponse> sendEmails) {
    List<Email> emails = new ArrayList<>();
    List<EmailSendResponse> emailToSave = sendEmails.stream().filter(
            mail -> mail.emailSentStatus() == EmailSentStatus.SUCCESS).toList();

    for(EmailSendResponse mail : emailToSave) {
      emails.add(Email.initialize(mail.recipient(), subject, content, announcementId, adminId));
    }

    emailRepository.saveAll(emails);
  }
}
