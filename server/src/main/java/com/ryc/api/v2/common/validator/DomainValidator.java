package com.ryc.api.v2.common.validator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

import com.ryc.api.v2.common.exception.code.ErrorCode;
import com.ryc.api.v2.common.exception.custom.InvalidFormatException;

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
  protected static void validateNotNullOrEmpty(String value, ErrorCode errorCode) {
    if (value == null || value.isEmpty()) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** null은 허용 필드에 한하여 사용. 값이 있는 경우에만 Empty Check */
  protected static void validateNotEmpty(String value, ErrorCode errorCode) {
    if (value != null && value.isEmpty()) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** null 검증 */
  protected static void validateNotNull(Object value, ErrorCode errorCode) {
    if (value == null) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 최소 길이 검증 */
  protected static void validateMinLength(String value, int minLength, ErrorCode errorCode) {
    if (value.length() < minLength) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 최대 길이 검증 */
  protected static void validateMaxLength(String value, int maxLength, ErrorCode errorCode) {
    if (value.length() > maxLength) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 정확한 길이 검증 */
  protected static void validateExactLength(String value, int exactLength, ErrorCode errorCode) {
    if (value.length() != exactLength) {
      throw new InvalidFormatException(errorCode);
    }
  }

  protected static void validateExactLength(int count, int exactLength, ErrorCode errorCode) {
    if (count != exactLength) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 길이 범위 검증 */
  protected static void validateLengthRange(
      String value, int minLength, int maxLength, ErrorCode errorCode) {
    if (value.length() < minLength || value.length() > maxLength) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 패턴 검증 */
  protected static void validatePattern(String value, Pattern pattern, ErrorCode errorCode) {
    if (!pattern.matcher(value).matches()) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** URL 프로토콜 검증 */
  protected static void validateUrlProtocol(String url, String protocol, ErrorCode errorCode) {
    if (!url.startsWith(protocol)) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 특정 문자 포함 여부 검증 */
  protected static void validateContains(
      String value, String requiredSubstring, ErrorCode errorCode) {
    if (!value.contains(requiredSubstring)) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** 유효한 시간 범위 검증 */
  protected static void validateDateRange(
      LocalDateTime startDate, LocalDateTime endDate, ErrorCode errorCode) {
    if (startDate.isAfter(endDate)) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** BigDecimal 범위 검증 */
  protected static void validateBigDecimalRange(
      BigDecimal value, BigDecimal minValue, BigDecimal maxValue, ErrorCode errorCode) {
    if (value.compareTo(minValue) < 0 || value.compareTo(maxValue) > 0) {
      throw new InvalidFormatException(errorCode);
    }
  }

  /** BigDecimal 소수점 자리수 검증 */
  protected static void validateBigDecimalScale(
      BigDecimal value, int maxScale, ErrorCode errorCode) {
    if (value.scale() > maxScale) {
      throw new InvalidFormatException(errorCode);
    }
  }
}
