package com.ryc.api.v2.common.aop.aspect;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerMapping;

import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotencyRepository;
import com.ryc.api.v2.common.constant.CustomHeaderConstant;
import com.ryc.api.v2.common.exception.code.EmailErrorCode;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.email.service.EmailVerificationService;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class EmailVerificationCodeAspect {

  private final EmailVerificationService verificationService;
  private final ApplicationSubmissionIdempotencyRepository idempotencyRepository;
  private final HttpServletRequest request;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.VerifyEmailCode)")
  public void verifyEmailCode() {
    String announcementId = getAnnouncementId();
    if (announcementId != null) {
      String idempotencyKey = request.getHeader(CustomHeaderConstant.IDEMPOTENCY_KEY_HEADER_NAME);
      if (idempotencyKey == null || idempotencyKey.isBlank()) {
        throw new BusinessRuleException(ApplicationCreateErrorCode.IDEMPOTENCY_KEY_REQUIRED);
      }
    }

    if (isCompletedApplicationSubmissionRetry()) {
      return;
    }

    String header = request.getHeader(CustomHeaderConstant.EMAIL_VERIFICATION_CODE_HEADER_NAME);

    if (header == null || !header.chars().allMatch(Character::isDigit)) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_BAD_REQUEST);
    }

    int code = Integer.parseInt(header);
    if (verificationService.isVerified(code)) {
      verificationService.deleteByCode(code);
      return;
    }

    throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_INVALID);
  }

  private boolean isCompletedApplicationSubmissionRetry() {
    String idempotencyKey = request.getHeader(CustomHeaderConstant.IDEMPOTENCY_KEY_HEADER_NAME);
    String announcementId = getAnnouncementId();
    if (idempotencyKey == null || idempotencyKey.isBlank() || announcementId == null) {
      return false;
    }

    return idempotencyRepository
        .findByAnnouncementIdAndIdempotencyKey(announcementId, idempotencyKey.trim())
        .map(idempotency -> idempotency.isCompleted())
        .orElse(false);
  }

  private String getAnnouncementId() {
    Object pathVariables = request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
    if (!(pathVariables instanceof Map<?, ?> variables)) {
      return null;
    }

    Object announcementId = variables.get("announcement-id");
    return announcementId instanceof String ? (String) announcementId : null;
  }
}
