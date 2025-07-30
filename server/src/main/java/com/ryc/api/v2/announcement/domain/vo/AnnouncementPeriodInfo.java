package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementPeriodInfoRequest;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;

/**
 * Announcement 기간 정보 Pojo객체
 *
 * @param applicationPeriod 지원기간
 * @param interviewPeriod 면접기간 (면접 진행시)
 * @param finalResultPeriod 최종발표 기간
 * @param documentResultPeriod 서류 결과 발표 기간 (면접 진행시)
 */
@Builder
public record AnnouncementPeriodInfo(
    Period applicationPeriod,
    Period interviewPeriod,
    Period finalResultPeriod,
    Period documentResultPeriod) {
  public static AnnouncementPeriodInfo from(AnnouncementPeriodInfoRequest periodInfo) {
    Period finalResultPeriod = Period.from(periodInfo.finalResultPeriod());
    Period documentResultPeriod = Period.from(periodInfo.documentResultPeriod());
    Period interviewPeriod = Period.from(periodInfo.interviewPeriod());
    Period applicationPeriod = Period.from(periodInfo.applicationPeriod());

    return AnnouncementPeriodInfo.builder()
        .applicationPeriod(applicationPeriod)
        .interviewPeriod(interviewPeriod)
        .finalResultPeriod(finalResultPeriod)
        .documentResultPeriod(documentResultPeriod)
        .build();
  }

  /**
   * 객체 유효성 검사
   *
   * @param hasInterview 면접 여부
   * @throws IllegalArgumentException
   */
  public void validate(boolean hasInterview) {

    // 1. 면접 진행 시 추가되는 기간 값들에 대한 checkBusinessRules
    if (hasInterview) {
      if (interviewPeriod == null) {
        throw new BusinessRuleException(AnnouncementErrorCode.INTERVIEW_PERIOD_REQUIRED);
      }
      if (documentResultPeriod == null) {
        throw new BusinessRuleException(AnnouncementErrorCode.DOCUMENT_RESULT_PERIOD_REQUIRED);
      }
    } else {
      if (interviewPeriod != null) {
        throw new BusinessRuleException(AnnouncementErrorCode.INTERVIEW_PERIOD_NOT_ALLOWED);
      }
      if (documentResultPeriod != null) {
        throw new BusinessRuleException(AnnouncementErrorCode.DOCUMENT_RESULT_PERIOD_NOT_ALLOWED);
      }
    }

    // 2. 기간들간의 checkBusinessRules
    validateSequence(hasInterview);
  }

  /**
   * 기간 순서 검증
   *
   * @param hasInterview 면접 여부
   * @throws IllegalArgumentException 기간 순서가 맞지 않을 경우
   */
  private void validateSequence(Boolean hasInterview) {
    // 인터뷰가 있을경우 지원 기간 -> 서류발표기간 -> 면접기간 -> 최종발표기간
    if (hasInterview) {
      if (!applicationPeriod.isBefore(documentResultPeriod)) {
        throw new BusinessRuleException(
            AnnouncementErrorCode.DOCUMENT_PERIOD_MUST_BE_AFTER_APPLICATION);
      }
      if (!documentResultPeriod.isBefore(interviewPeriod)) {
        throw new BusinessRuleException(
            AnnouncementErrorCode.INTERVIEW_PERIOD_MUST_BE_AFTER_DOCUMENT);
      }
      if (interviewPeriod.isBefore(finalResultPeriod)) {
        throw new BusinessRuleException(
            AnnouncementErrorCode.FINAL_RESULT_PERIOD_MUST_BE_AFTER_INTERVIEW);
      }
    }
    // 없을경우 모집기간 -> 최종발표기간
    else {
      if (applicationPeriod.isBefore(finalResultPeriod)) {
        throw new BusinessRuleException(
            AnnouncementErrorCode.FINAL_RESULT_PERIOD_MUST_BE_AFTER_APPLICATION);
      }
    }
  }
}
