package com.ryc.api.v2.applicant.domain.enums;

import java.util.stream.Stream;

public enum ApplicantStatus {
  // TODO: PENDING 제거
  PENDING,
  DOCUMENT_PASS,
  DOCUMENT_FAIL,
  INTERVIEW_PASS,
  INTERVIEW_FAIL,
  FINAL_PASS,
  FINAL_FAIL;

  public static ApplicantStatus from(String value) {
    if (value == null) {
      return null;
    }
    return Stream.of(ApplicantStatus.values())
        .filter(applicantStatus -> applicantStatus.name().equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 status 값입니다: " + value));
  }
}
