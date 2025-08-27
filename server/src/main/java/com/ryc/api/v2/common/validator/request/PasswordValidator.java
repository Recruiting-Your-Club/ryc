package com.ryc.api.v2.common.validator.request;

import java.util.regex.Pattern;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.ryc.api.v2.common.validator.request.annotation.Password;

/** OWASP 준수 Password 검증 */
public class PasswordValidator implements ConstraintValidator<Password, String> {

  private static final int MIN_PASSWORD_LENGTH = 8;
  private static final int MAX_PASSWORD_LENGTH = 128;

  private static final Pattern PASSWORD_UPPERCASE_PATTERN = Pattern.compile(".*[A-Z].*");
  private static final Pattern PASSWORD_LOWERCASE_PATTERN = Pattern.compile(".*[a-z].*");
  private static final Pattern PASSWORD_DIGIT_PATTERN = Pattern.compile(".*[0-9].*");
  private static final Pattern PASSWORD_SPECIAL_PATTERN =
      Pattern.compile(".*[!@#$%^&*()_+\\-=\\[\\]{}|;:,.<>?].*");
  private static final Pattern PASSWORD_REPEATED_PATTERN =
      Pattern.compile(".*(.)\\1{2,}.*"); // 연속 3개 이상 동일 문자
  private static final Pattern PASSWORD_SEQUENTIAL_PATTERN =
      Pattern.compile(
          ".*(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890|qwe|wer|ert|rty|tyu|yui|uio|iop|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vbn|bnm).*",
          Pattern.CASE_INSENSITIVE);
  private static final Pattern PASSWORD_WHITESPACE_PATTERN =
      Pattern.compile(".*\\s.*"); // 공백 문자 포함 검증

  @Override
  public boolean isValid(String password, ConstraintValidatorContext context) {
    // 길이 검증
    if (password.length() < MIN_PASSWORD_LENGTH) {
      setErrorMessage(context, "비밀번호는 최소 " + MIN_PASSWORD_LENGTH + "자 이상이어야 합니다");
      return false;
    }

    if (password.length() > MAX_PASSWORD_LENGTH) {
      setErrorMessage(context, "비밀번호는 " + MAX_PASSWORD_LENGTH + "자를 초과할 수 없습니다");
      return false;
    }

    // 복잡성 검증 - 대문자 포함
    if (!PASSWORD_UPPERCASE_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 최소 하나 이상의 대문자를 포함해야 합니다");
      return false;
    }

    // 복잡성 검증 - 소문자 포함
    if (!PASSWORD_LOWERCASE_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 최소 하나 이상의 소문자를 포함해야 합니다");
      return false;
    }

    // 복잡성 검증 - 숫자 포함
    if (!PASSWORD_DIGIT_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 최소 하나 이상의 숫자를 포함해야 합니다");
      return false;
    }

    // 복잡성 검증 - 특수문자 포함
    if (!PASSWORD_SPECIAL_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 최소 하나 이상의 특수문자(!@#$%^&*()_+-=[]{}|;:,.<>?)를 포함해야 합니다");
      return false;
    }

    // 금지 패턴 검증 - 연속된 동일 문자
    if (PASSWORD_REPEATED_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 3개 이상의 연속된 동일 문자를 포함할 수 없습니다");
      return false;
    }

    // 금지 패턴 검증 - 순차적 문자
    if (PASSWORD_SEQUENTIAL_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 순차적인 문자 패턴(abc, 123, qwe 등)을 포함할 수 없습니다");
      return false;
    }

    // 금지 패턴 검증 - 공백 문자
    if (PASSWORD_WHITESPACE_PATTERN.matcher(password).matches()) {
      setErrorMessage(context, "비밀번호는 공백 문자를 포함할 수 없습니다");
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
