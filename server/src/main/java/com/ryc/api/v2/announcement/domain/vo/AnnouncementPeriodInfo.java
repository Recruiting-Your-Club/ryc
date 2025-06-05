package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementPeriodInfoRequest;

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
  public static AnnouncementPeriodInfo initialize(AnnouncementPeriodInfoRequest periodInfo) {
    Period finalResultPeriod = Period.initialize(periodInfo.finalResultPeriod());
    Period documentResultPeriod = Period.initialize(periodInfo.documentResultPeriod());
    Period interviewPeriod = Period.initialize(periodInfo.interviewPeriod());
    Period applicationPeriod = Period.initialize(periodInfo.applicationPeriod());

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
    // 1. 필수 입력 값 validate
    applicationPeriod.validate();
    finalResultPeriod.validate();

    // 2. 면접 진행 시 추가되는 기간 값들에 대한 validate
    if (hasInterview) {
      if (interviewPeriod == null) {
        throw new IllegalArgumentException("interviewPeriod shouldn't be null.");
      }
      interviewPeriod.validate();

      if (documentResultPeriod == null) {
        throw new IllegalArgumentException("documentResultPeriod shouldn't be null.");
      }
      documentResultPeriod.validate();
    }

    // 3. 기간들간의 validate
    validateSequence(hasInterview);
  }

  /**
   * 기간 순서 검증
   *
   * @param hasInterview 면접 여부
   * @throws IllegalArgumentException 기간 순서가 맞지 않을 경우
   */
  private void validateSequence(Boolean hasInterview) {
    if (hasInterview) {
      if (!applicationPeriod.isBefore(interviewPeriod)) {
        throw new IllegalArgumentException("applicationPeriod should be before interviewPeriod");
      }
      if (!interviewPeriod.isBefore(finalResultPeriod)) {
        throw new IllegalArgumentException("interviewPeriod should be before finalResultPeriod");
      }
      if (!finalResultPeriod.isBefore(documentResultPeriod)) {
        throw new IllegalArgumentException(
            "finalResultPeriod should be before documentResultPeriod");
      }
    } else {
      if (!applicationPeriod.isBefore(finalResultPeriod)) {
        throw new IllegalArgumentException("applicationPeriod should be before finalResultPeriod");
      }
    }
  }
}
