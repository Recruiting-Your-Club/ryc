package com.ryc.api.v2.announcement.domain.vo;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.APPLICATION_PERIOD_NULL;

import com.ryc.api.v2.common.validator.DomainValidator;

/** AnnouncementPeriodInfo 도메인 전용 Validator */
final class AnnouncementPeriodInfoValidator extends DomainValidator {

  private AnnouncementPeriodInfoValidator() {}

  static void validate(Period applicationPeriod) {
    validateApplicationPeriod(applicationPeriod);
  }

  private static void validateApplicationPeriod(Period applicationPeriod) {
    validateNotNull(applicationPeriod, APPLICATION_PERIOD_NULL);
  }
}
