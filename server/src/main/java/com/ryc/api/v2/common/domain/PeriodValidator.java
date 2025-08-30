package com.ryc.api.v2.common.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.time.LocalDateTime;

import com.ryc.api.v2.common.validator.DomainValidator;

/** Period 도메인 전용 Validator */
final class PeriodValidator extends DomainValidator {

  private PeriodValidator() {}

  static void validate(LocalDateTime startDate, LocalDateTime endDate) {
    validateStartDate(startDate);
    validateEndDate(endDate);
    validateDateRange(startDate, endDate, PERIOD_INVALID_RANGE);
  }

  /** 검증 private 헬퍼 메소드 */
  private static void validateStartDate(LocalDateTime startDate) {
    // 기타 Null 허용 기한(예: 서류합격 시작일, 면접시작일, 최종합격자 발표 시작일)
  }

  private static void validateEndDate(LocalDateTime endDate) {
    // 기타 Null 허용 기한(예: 서류합격 종료일, 면접종료일, 최종합격자 발표 종료일)
  }
}
