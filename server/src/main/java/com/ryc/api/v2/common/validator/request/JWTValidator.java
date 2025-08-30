package com.ryc.api.v2.common.validator.request;

import java.util.regex.Pattern;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.ryc.api.v2.common.validator.request.annotation.JWT;

public class JWTValidator implements ConstraintValidator<JWT, String> {

  private static final Pattern BASE_64_URL_PATTERN = Pattern.compile("^[A-Za-z0-9_-]*$");
  private static final int MIN_TOKEN_LENGTH = 100;
  private static final int MAX_TOKEN_LENGTH = 1000; // DoS 대비
  private static final int TOKEN_PART_COUNT = 3;
  private static final String TOKEN_DOT_SYMBOL = ".";

  @Override
  public boolean isValid(String token, ConstraintValidatorContext context) {
    // 1. 길이 검증 (DoS 대비)
    if (token.length() < MIN_TOKEN_LENGTH) {
      setErrorMessage(context, "JWT 토큰은 최소 " + MIN_TOKEN_LENGTH + "자 이상이어야 합니다");
      return false;
    }
    if (token.length() > MAX_TOKEN_LENGTH) {
      setErrorMessage(context, "JWT 토큰은 " + MAX_TOKEN_LENGTH + "자를 초과할 수 없습니다");
      return false;
    }

    // 2. JWT 구조적 검증 (헤더.페이로드.서명)
    if (!token.contains(TOKEN_DOT_SYMBOL)) {
      setErrorMessage(context, "JWT 토큰은 점(.)으로 구분된 3개 부분을 가져야 합니다");
      return false;
    }

    String[] parts = token.split("\\.");
    if (parts.length != TOKEN_PART_COUNT) {
      setErrorMessage(context, "JWT 토큰은 정확히 " + TOKEN_PART_COUNT + "개의 부분으로 구성되어야 합니다");
      return false;
    }

    // 3. Base64Url 인코딩 검증
    for (String part : parts) {
      if (!BASE_64_URL_PATTERN.matcher(part).matches()) {
        setErrorMessage(context, "JWT 토큰의 각 파트는 Base64URL 형식이어야 합니다");
        return false;
      }
    }

    return true;
  }

  /** 커스텀 오류 메시지를 설정하는 헬퍼 메서드 */
  private void setErrorMessage(ConstraintValidatorContext context, String message) {
    context.disableDefaultConstraintViolation();
    context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
  }
}
