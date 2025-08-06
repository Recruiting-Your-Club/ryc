package com.ryc.api.v2.announcement.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param id 공고 Id
 * @param title 공고 제목
 * @param summaryDescription 요약 설명
 * @param detailDescription 상세 설명
 * @param target 대상
 * @param field 모집분야
 * @param announcementStatus 공고 상태
 * @param announcementType 공고 유형
 * @param hasInterview 인터뷰 여부
 * @param activityPeriod 활동 기간
 * @param numberOfPeople 모집 인원
 * @param applicationPeriod 지원 기간
 * @param interviewPeriod 면접 기간
 * @param documentResultPeriod 서류 결과 기간
 * @param finalResultPeriod 최종 발표 기간
 * @param applicationForm 지원서
 * @param tags
 * @param images
 */
@Builder
public record AnnouncementGetDetailResponse(
    // 기본 정보
    @Schema(description = "공고 ID", example = "123e4567-e89b-12d3-a456-426614174000") String id,
    @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집") String title,
    @Schema(description = "요약 설명", example = "코딩 동아리에서 신입 회원을 모집합니다.") String summaryDescription,
    @Schema(description = "상세 설명", example = "자세한 모집 내용은 다음과 같습니다...") String detailDescription,
    @Schema(description = "대상", example = "컴퓨터공학과 학생") String target,
    @Schema(description = "모집 분야", example = "벡엔드") String field,
    @Schema(description = "공고 상태", example = "RECRUITING") AnnouncementStatus announcementStatus,
    @Schema(description = "공고 유형", example = "ALWAYS_OPEN") AnnouncementType announcementType,
    @Schema(description = "인터뷰 여부", example = "true") Boolean hasInterview,
    @Schema(description = "활동 기간", example = "2025년 3월 ~ 12월") String activityPeriod,
    @Schema(description = "모집 인원", example = "10명") String numberOfPeople,

    // 기간 정보
    @Schema(description = "지원 기간") PeriodResponse applicationPeriod,
    @Schema(description = "면접 기간") PeriodResponse interviewPeriod,
    @Schema(description = "서류 결과 발표 기간") PeriodResponse documentResultPeriod,
    @Schema(description = "최종 결과 발표 기간") PeriodResponse finalResultPeriod,

    // 지원서 정보
    ApplicationFormResponse applicationForm,

    // 기타 정보
    @Schema(description = "태그 목록", example = "[\"프로그래밍\", \"웹개발\", \"백엔드\"]") List<String> tags,
    @Schema(description = "이미지 목록") List<ImageResponse> images) {
  /** 도메인 객체에서 응답 DTO를 생성하는 팩토리 메서드 */
  public static AnnouncementGetDetailResponse from(Announcement announcement) {
    if (announcement == null) {
      return null;
    }

    AnnouncementPeriodInfo periodInfo = announcement.getAnnouncementPeriodInfo();

    List<String> tags = announcement.getTags().stream().map(Tag::label).toList();
    List<ImageResponse> images =
        announcement.getImages().stream().map(ImageResponse::from).toList();

    ApplicationFormResponse application =
        ApplicationFormResponse.from(announcement.getApplicationForm());

    PeriodResponse applicationPeriod = PeriodResponse.from(periodInfo.applicationPeriod());
    PeriodResponse interviewPeriod = PeriodResponse.from(periodInfo.interviewPeriod());
    PeriodResponse documentResultPeriod = PeriodResponse.from(periodInfo.documentResultPeriod());
    PeriodResponse finalResultPeriod = PeriodResponse.from(periodInfo.finalResultPeriod());

    return AnnouncementGetDetailResponse.builder()
        .id(announcement.getId())
        .title(announcement.getTitle())
        .summaryDescription(announcement.getSummaryDescription())
        .detailDescription(announcement.getDetailDescription())
        .target(announcement.getTarget())
        .field(announcement.getField())
        .announcementStatus(announcement.getAnnouncementStatus())
        .announcementType(announcement.getAnnouncementType())
        .hasInterview(announcement.getHasInterview())
        .activityPeriod(announcement.getActivityPeriod())
        .numberOfPeople(announcement.getNumberOfPeople())
        .applicationPeriod(applicationPeriod)
        .interviewPeriod(interviewPeriod)
        .documentResultPeriod(documentResultPeriod)
        .finalResultPeriod(finalResultPeriod)
        .applicationForm(application)
        .tags(tags)
        .images(images)
        .build();
  }
}
