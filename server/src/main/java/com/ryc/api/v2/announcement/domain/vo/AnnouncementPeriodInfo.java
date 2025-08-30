package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementPeriodInfoRequest;
import com.ryc.api.v2.common.domain.Period;

import lombok.Builder;

/**
 * Announcement 기간 정보 Pojo객체
 *
 * @param applicationPeriod 지원기간
 * @param interviewPeriod 면접기간 (면접 진행시)
 * @param finalResultPeriod 최종발표 기간
 * @param documentResultPeriod 서류 결과 발표 기간 (면접 진행시)
 */

/**
 * 중요(조상준): 상시모집 케이스 때문에 서버에서는 날짜 순위 검증을 불필요하게 할 이유 없음 (applicationPeriod < interviewPeriod <
 * finalResultPeriod < documentResultPeriod) 현재 서비스 내에서는 각 기간의 시작/종료일 검증만 기능적으로 필요하며, 각 기한 종류간의
 * 상하관계는 기능에서 사용되거나 필요하지 않음. (기준일: 25.08.29) 오히려 해당 검증이 수반된다면, 현재 상시모집의 경우 오류 발생. 따라서 해당 검증 추가 금지.
 */
public record AnnouncementPeriodInfo(
    Period applicationPeriod, // 이 필드만 필수입력
    Period interviewPeriod,
    Period finalResultPeriod,
    Period documentResultPeriod) {

  @Builder
  public AnnouncementPeriodInfo {
    AnnouncementPeriodInfoValidator.validate(applicationPeriod);
  }

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
