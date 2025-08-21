package com.ryc.api.v2.announcement.domain.vo;

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
    validateNotNull(startDate, PERIOD_START_DATE_NULL);
  }

  private static void validateEndDate(LocalDateTime endDate) {
    validateNotNull(endDate, PERIOD_END_DATE_NULL);
  }
}
