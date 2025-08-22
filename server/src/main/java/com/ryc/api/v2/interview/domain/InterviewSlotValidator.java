package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.common.domain.Period;
import com.ryc.api.v2.common.validator.DomainValidator;

final class InterviewSlotValidator extends DomainValidator {

  private InterviewSlotValidator() {}

  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final int MIN_MAX_NUMBER_OF_PEOPLE = 0;
  private static final int MAX_MAX_NUMBER_OF_PEOPLE = 100;

  static void validate(
      String id,
      String creatorId,
      String announcementId,
      Integer maxNumberOfPeople,
      Period period,
      List<InterviewReservation> interviewReservations) {

    validateId(id);
    validateCreatorId(creatorId);
    validateAnnouncementId(announcementId);
    validateMaxNumberOfPeople(maxNumberOfPeople);
    validatePeriod(period);
    validateInterviewReservations(interviewReservations);
  }

  private static void validateId(String id) {
    validateNotNullOrEmpty(id, INTERVIEW_SLOT_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, INTERVIEW_SLOT_INVALID_ID_FORMAT);
  }

  private static void validateCreatorId(String creatorId) {
    validateNotNullOrEmpty(creatorId, INTERVIEW_SLOT_CREATOR_ID_NULL_OR_EMPTY);
    validatePattern(creatorId, UUID_PATTERN, INTERVIEW_SLOT_INVALID_CREATOR_ID_FORMAT);
  }

  private static void validateAnnouncementId(String announcementId) {
    validateNotNullOrEmpty(announcementId, INTERVIEW_SLOT_ANNOUNCEMENT_ID_NULL_OR_EMPTY);
    validatePattern(announcementId, UUID_PATTERN, INTERVIEW_SLOT_INVALID_ANNOUNCEMENT_ID_FORMAT);
  }

  private static void validateMaxNumberOfPeople(Integer maxNumberOfPeople) {
    validateNotNull(maxNumberOfPeople, INTERVIEW_SLOT_MAX_NUMBER_OF_PEOPLE_NULL);
    validateIntRange(
        maxNumberOfPeople,
        MIN_MAX_NUMBER_OF_PEOPLE,
        MAX_MAX_NUMBER_OF_PEOPLE,
        INTERVIEW_SLOT_INVALID_MAX_NUMBER_OF_PEOPLE_RANGE);
  }

  private static void validatePeriod(Period period) {
    validateNotNull(period, INTERVIEW_SLOT_PERIOD_NULL);
  }

  private static void validateInterviewReservations(
      List<InterviewReservation> interviewReservations) {
    // 빈리스트 허용
    validateNotNull(interviewReservations, INTERVIEW_SLOT_RESERVATIONS_NULL);
  }
}
