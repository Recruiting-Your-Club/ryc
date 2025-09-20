package com.ryc.api.v2.email.infra.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.domain.EmailVerificationRepository;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailCleanupScheduler {

  private final EmailRepository emailRepository;
  private final EmailVerificationRepository emailVerificationRepository;

  @Scheduled(cron = "0 0 3 * * *")
  @Transactional
  protected void cleanupSentEmails() {
    if (emailRepository.existsByStatus(EmailSentStatus.SENT)) {
      emailRepository.deleteByStatus(EmailSentStatus.SENT);
    }
  }

  @Scheduled(cron = "0 0 4 * * *")
  @Transactional
  protected void cleanupVerifiedEmails() {
    if (emailVerificationRepository.existsAttemptedCodes()) {
      emailVerificationRepository.deleteAttemptedCodes();
    }
  }
}
