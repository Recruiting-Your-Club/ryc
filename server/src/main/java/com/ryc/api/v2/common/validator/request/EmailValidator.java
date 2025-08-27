package com.ryc.api.v2.common.validator.request;

import java.util.regex.Pattern;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.ryc.api.v2.common.validator.request.annotation.Email;

/** RFC 5322 준수 이메일 검증 */
public class EmailValidator implements ConstraintValidator<Email, String> {

  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");

  private static final int MAX_EMAIL_LENGTH = 320;
  private static final int MIN_EMAIL_LOCAL_PART_LENGTH = 1;
  private static final int MAX_EMAIL_LOCAL_PART_LENGTH = 64;
  private static final int MAX_EMAIL_DOMAIN_PART_LENGTH = 253;

  private static final String EMAIL_AT_SYMBOL = "@";

  @Override
  public boolean isValid(String email, ConstraintValidatorContext context) {
    if (email.length() > MAX_EMAIL_LENGTH) {
      setErrorMessage(context, "이메일은 320자를 초과할 수 없습니다.");
      return false;
    }

    if (!email.contains(EMAIL_AT_SYMBOL)) {
      setErrorMessage(context, "이메일에 @ 기호가 없습니다.");
      return false;
    }

    int atIndex = email.indexOf(EMAIL_AT_SYMBOL);
    String localPart = email.substring(0, atIndex);
    String domainPart = email.substring(atIndex + 1);

    if (localPart.length() < MIN_EMAIL_LOCAL_PART_LENGTH
        || localPart.length() > MAX_EMAIL_LOCAL_PART_LENGTH) {
      setErrorMessage(context, "이메일 로컬 부분은 1자 이상 64자 이하여야 합니다.");
      return false;
    }

    if (domainPart.isEmpty()) {
      setErrorMessage(context, "이메일 도메인 부분(@이하)이 없을 수 없습니다.");
      return false;
    }

    if (domainPart.length() > MAX_EMAIL_DOMAIN_PART_LENGTH) {
      setErrorMessage(context, "이메일 도메인 부분은 253자를 초과할 수 없습니다.");
      return false;
    }

    if (!EMAIL_PATTERN.matcher(email).matches()) {
      setErrorMessage(context, "이메일이 RFC 5322 표준 형식에 맞지 않습니다.");
      return false;
    }

    return true;
  }

  /** 커스텀 오류 메시지를 설정하는 헬퍼 메서드 */
  private void setErrorMessage(ConstraintValidatorContext context, String message) {
    context.disableDefaultConstraintViolation();
    context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
  }
}
