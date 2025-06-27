package com.ryc.api.v2.email.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

  @Value("${reservation.base-url}")
  private String baseUri;

  private final EmailRepository emailRepository;

  public List<Email> createEmail(String adminId, String announcementId, EmailSendRequest body) {
    return body.recipients().stream()
        .map(
            recipient ->
                Email.initialize(
                    recipient, body.subject(), body.content(), announcementId, adminId))
        .toList();
  }

  public List<Email> updateEachEmailContent(List<Email> emails) {
    return null;
  }

  @Transactional
  public void saveEmails(List<Email> emails) {
    emailRepository.saveAll(emails);
  }
}
