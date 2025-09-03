package com.ryc.api.v2.email.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailVerificationRepository;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailCleanupService {

  private final EmailRepository emailRepository;
  private final EmailVerificationRepository emailVerificationRepository;

  @Scheduled(cron = "0 0 3 * * *")
  protected void cleanupSentEmails() {
    emailRepository.deleteByStatus(EmailSentStatus.SENT);
  }

  @Scheduled(cron = "0 0 4 * * *")
  protected void cleanupVerifiedEmails() {
    emailVerificationRepository.deleteAttemptedCodes();
  }
}
