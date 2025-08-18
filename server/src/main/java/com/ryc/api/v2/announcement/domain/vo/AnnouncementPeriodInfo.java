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
}
