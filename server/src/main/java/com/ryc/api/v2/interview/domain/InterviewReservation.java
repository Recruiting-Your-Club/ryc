package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
public class InterviewReservation {

  private final String id;
  // TODO:  도메인이 외부 도메인을 필드로 가지고 있음. 수정 필요 (도메인 독립성 위반)
  private final Applicant applicant;

  @Builder
  private InterviewReservation(String id, Applicant applicant, EmailSentStatus reminderStatus) {
    InterviewReservationValidator.validate(id, applicant);

    if (applicant.getStatus() != ApplicantStatus.INTERVIEW_PENDING) {
      throw new InterviewException(InterviewErrorCode.APPLICANT_STATUS_NOT_ELIGIBLE_FOR_INTERVIEW);
    }

    this.id = id;
    this.applicant = applicant;
  }

  public static InterviewReservation initialize(Applicant applicant) {
    return InterviewReservation.builder()
        .id(DEFAULT_INITIAL_ID)
        .applicant(applicant)
        .reminderStatus(EmailSentStatus.PENDING)
        .build();
  }
}
