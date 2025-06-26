package com.ryc.api.v2.email.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailHistoryService {

  private final EmailRepository emailRepository;

  @Transactional
  public void saveEmails(
      List<String> recipients, String subject, String content, String clubId, String adminEmail) {
    List<Email> emails = new ArrayList<>();

    for (String recipient : recipients) {
      Email email = Email.initialize(recipient, subject, content, clubId, adminEmail);
      emails.add(email);
    }

    emailRepository.saveAll(emails);
  }
}
