package com.ryc.api.v2.auth.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class RefreshTokenValidator extends DomainValidator {

  private RefreshTokenValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern BASE_64_URL_PATTERN = Pattern.compile("^[A-Za-z0-9_-]*$");

  private static final int MIN_TOKEN_LENGTH = 100;
  private static final int MAX_TOKEN_LENGTH = 1000; // DoS 대비
  private static final int TOKEN_PART_COUNT = 3;
  private static final String TOKEN_DOT_SYMBOL = ".";

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(String id, String adminId, String token, LocalDateTime expirationTime) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateAdminId(adminId);
    validateToken(token);
    validateExpirationTime(expirationTime);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, REFRESH_TOKEN_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, REFRESH_TOKEN_INVALID_ID_FORMAT);
  }

  private static void validateAdminId(String adminId) {
    validateNotNullOrEmpty(adminId, REFRESH_TOKEN_ADMIN_ID_NULL_OR_EMPTY);
    validatePattern(adminId, UUID_PATTERN, REFRESH_TOKEN_INVALID_ADMIN_ID_FORMAT);
  }

  /** 대칭키 방식(HS256) JWT 포멧 준수 */
  private static void validateToken(String token) {
    // 1. null 또는 빈 값 검증
    validateNotNullOrEmpty(token, REFRESH_TOKEN_TOKEN_NULL_OR_EMPTY);

    // 2. 길이 검증 (DoS 대비)
    validateLengthRange(token, MIN_TOKEN_LENGTH, MAX_TOKEN_LENGTH, REFRESH_TOKEN_INVALID_LENGTH);

    // 3. JWT 구조적 검증 (헤더.페이로드.서명)
    validateContains(token, TOKEN_DOT_SYMBOL, REFRESH_TOKEN_MISSING_DOT_SYMBOL);

    String[] parts = token.split("\\.");
    validateExactLength(parts.length, TOKEN_PART_COUNT, REFRESH_TOKEN_INVALID_PART_COUNT);

    // 4. Base64Url 인코딩 검증
    for (String part : parts) {
      validatePattern(part, BASE_64_URL_PATTERN, REFRESH_TOKEN_INVALID_PART_FORMAT);
    }
  }

  private static void validateExpirationTime(LocalDateTime expirationTime) {
    validateNotNull(expirationTime, REFRESH_TOKEN_EXPIRATION_TIME_NULL);
  }
}
