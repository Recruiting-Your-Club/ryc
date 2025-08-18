package com.ryc.api.v2.common.validator;

import java.util.regex.Pattern;

/**
 * 도메인 Validator 추상 클래스 모든 도메인 Validator가 상속받아 원자적 검증 단위를 조합하여 사용
 *
 * <p>컨벤션: 1. 각 도메인 Validator는 이 클래스를 상속받아야 함 2. validate() 메소드를 static으로 구현 3. 원자적 검증 메소드들을 조합하여
 * 도메인별 검증 구성 4. 구체적 검증 로직은 각 도메인에서 조합하여 구현
 */
public abstract class DomainValidator {

  // 생성자 protected 제한: 자식 클래스에서만 컴파일시 super() 호출 가능. 외부 인스턴스화 방지
  protected DomainValidator() {}

  /** null/empty 검증 */
  protected static void validateNotNullOrEmpty(String value, String fieldName) {
    if (value == null || value.isEmpty()) {
      throw new IllegalArgumentException(fieldName + " cannot be null or empty");
    }
  }

  /** null은 허용 필드에 한하여 사용. 값이 있는 경우에만 Empty Check */
  protected static void validateNotEmpty(String value, String fieldName) {
    if (value != null && value.isEmpty()) {
      throw new IllegalArgumentException(fieldName + " cannot be empty (null is allowed)");
    }
  }

  /** null 검증 */
  protected static void validateNotNull(Object value, String fieldName) {
    if (value == null) {
      throw new IllegalArgumentException(fieldName + " cannot be null");
    }
  }

  /** 최소 길이 검증 */
  protected static void validateMinLength(String value, String fieldName, int minLength) {
    if (value.length() < minLength) {
      throw new IllegalArgumentException(
          fieldName + " must be at least " + minLength + " characters");
    }
  }

  /** 최대 길이 검증 */
  protected static void validateMaxLength(String value, String fieldName, int maxLength) {
    if (value.length() > maxLength) {
      throw new IllegalArgumentException(fieldName + " cannot exceed " + maxLength + " characters");
    }
  }

  /** 정확한 길이 검증 */
  protected static void validateExactLength(String value, String fieldName, int exactLength) {
    if (value.length() != exactLength) {
      throw new IllegalArgumentException(
          fieldName + " must be exactly " + exactLength + " characters long");
    }
  }

  /** 길이 범위 검증 */
  protected static void validateLengthRange(
      String value, String fieldName, int minLength, int maxLength) {
    if (value.length() < minLength || value.length() > maxLength) {
      throw new IllegalArgumentException(
          fieldName + " must be between " + minLength + " and " + maxLength + " characters");
    }
  }

  /** 패턴 검증 */
  protected static void validatePattern(
      String value, String fieldName, Pattern pattern, String description) {
    if (!pattern.matcher(value).matches()) {
      throw new IllegalArgumentException(
          fieldName + " must be a valid " + pattern + " " + description);
    }
  }

  /** URL 프로토콜 검증 */
  protected static void validateUrlProtocol(String url, String fieldName, String protocol) {
    if (!url.startsWith(protocol)) {
      throw new IllegalArgumentException(fieldName + " must use " + protocol + " protocol");
    }
  }

  /** 특정 문자 포함 여부 검증 */
  protected static void validateContains(String value, String fieldName, String requiredSubstring) {
    if (!value.contains(requiredSubstring)) {
      throw new IllegalArgumentException(
          fieldName + " must contain " + requiredSubstring + " characters");
    }
  }
}
