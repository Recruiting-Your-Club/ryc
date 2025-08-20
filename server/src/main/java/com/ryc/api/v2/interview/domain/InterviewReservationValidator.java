package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.regex.Pattern;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.common.validator.DomainValidator;

final class InterviewReservationValidator extends DomainValidator {

  private InterviewReservationValidator() {}

  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  static void validate(String id, Applicant applicant) {
    validateId(id);
    validateApplicant(applicant);
  }

  private static void validateId(String id) {
    validateNotNullOrEmpty(id, INTERVIEW_RESERVATION_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, INTERVIEW_RESERVATION_INVALID_ID_FORMAT);
  }

  private static void validateApplicant(Applicant applicant) {
    validateNotNull(applicant, INTERVIEW_RESERVATION_APPLICANT_NULL);
  }
}