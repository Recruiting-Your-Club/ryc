package com.ryc.api.v2.common.aop.aspect;

import jakarta.servlet.http.HttpServletRequest;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

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
  private final HttpServletRequest request;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.VerifyEmailCode)")
  public void verifyEmailCode() {

    String header = request.getHeader(CustomHeaderConstant.EMAIL_VERIFICATION_CODE_HEADER_NAME);

    if (header == null || !header.chars().allMatch(Character::isDigit)) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_BAD_REQUEST);
    }

    int code = Integer.parseInt(header);
    if (verificationService.isVerified(code)) {
      verificationService.deleteByCode(code);
    }

    throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_INVALID);
  }
}
