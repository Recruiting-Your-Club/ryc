package com.ryc.api.v2.common.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.ANNOUNCEMENT_ID_NULL_OR_EMPTY;
import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.ANNOUNCEMENT_TAG_LABEL_TOO_LONG;

import com.ryc.api.v2.common.validator.DomainValidator;

/** Tag 전용 Validator */
public class TagValidator extends DomainValidator {

  private TagValidator() {}

  private static final int MAX_LABEL_LENGTH = 20;

  static void validate(String label) {
    validateLabel(label);
  }

  private static void validateLabel(String label) {
    validateNotNullOrEmpty(label, ANNOUNCEMENT_ID_NULL_OR_EMPTY);
    validateMaxLength(label, MAX_LABEL_LENGTH, ANNOUNCEMENT_TAG_LABEL_TOO_LONG);
  }
}
