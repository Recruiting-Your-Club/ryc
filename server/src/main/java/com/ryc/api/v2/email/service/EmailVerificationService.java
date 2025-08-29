package com.ryc.api.v2.email.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.EmailVerification;
import com.ryc.api.v2.email.domain.EmailVerificationRepository;
import com.ryc.api.v2.email.presentation.dto.request.VerificationCodeRequest;
import com.ryc.api.v2.email.presentation.dto.response.VerificationCodeCreatedResponse;

@Service
public class EmailVerificationService {

  private final EmailVerificationRepository verificationRepository;
  private final EmailService emailService;
  private final String ssocId;
  private final String emailVerificationTemplate;

  public EmailVerificationService(
      @Value("${SSOC_EMAIL_ID}") String ssocId,
      EmailVerificationRepository verificationRepository,
      EmailService emailService,
      ResourceLoader resourceLoader)
      throws IOException {
    this.ssocId = ssocId;
    this.verificationRepository = verificationRepository;
    this.emailService = emailService;

    Resource resource = resourceLoader.getResource("classpath:templates/email-verification.html");
    try (InputStream is = resource.getInputStream()) {
      this.emailVerificationTemplate = new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }
  }

  @Retryable
  @Transactional
  public VerificationCodeCreatedResponse createEmailVerificationCode(String email) {
    if (verificationRepository.existsByEmail(email)) {
      verificationRepository.deleteByEmail(email);
      verificationRepository.flush();
    }

    EmailVerification emailVerification = EmailVerification.initialize(email);
    EmailVerification saved = verificationRepository.save(emailVerification);

    sendEmailVerificationCode(email, saved.getCode());

    return new VerificationCodeCreatedResponse(saved.getExpiresAt());
  }

  @Transactional
  public void verificationEmailCode(VerificationCodeRequest body) {
    EmailVerification emailVerification = verificationRepository.findByEmail(body.email());
    EmailVerification verified = emailVerification.verify(Integer.parseInt(body.code()));
    verificationRepository.save(verified);
  }

  @Transactional
  public boolean isVerified(int code) {
    EmailVerification emailVerification = verificationRepository.findByCode(code);

    if (!emailVerification.getVerified()) {
      return false;
    }

    EmailVerification attemptdEmailVerification = emailVerification.attempt();
    verificationRepository.save(attemptdEmailVerification);
    return true;
  }

  @Transactional
  public void deleteByCode(int code) {
    verificationRepository.deleteByCode(code);
  }

  private void sendEmailVerificationCode(String email, int code) {
    String subject = "[SSOC] 이메일 인증 코드입니다.";
    String content = emailVerificationTemplate.replace("${code}", String.valueOf(code));

    emailService.createEmails(ssocId, ssocId, List.of(email), subject, content);
  }
}
