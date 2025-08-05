package com.ryc.api.v2.announcement.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AnnouncementUpdateResponse(
    @Schema(description = "공고 ID", example = "123e4567-e89b-12d3-a456-426614174000")
        String announcementId,
    @Schema(description = "클럽 ID", example = "123e4567-e89b-12d3-a456-426614174000") String clubId,
    @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집") String title,
    @Schema(description = "모집 인원", example = "10명") String numberOfPeople,
    @Schema(description = "상세 설명", example = "자세한 모집 내용은 다음과 같습니다...") String detailDescription,
    @Schema(description = "요약 설명", example = "코딩 동아리에서 신입 회원을 모집합니다.") String summaryDescription,
    @Schema(description = "공고 상태", example = "RECRUITING") AnnouncementStatus announcementStatus,
    @Schema(description = "활동 기간", example = "2025년 3월 ~ 12월") String activityPeriod,
    @Schema(description = "대상", example = "컴퓨터공학과 학생") String target,
    @Schema(description = "모집 분야", example = "백엔드") String field,
    @Schema(description = "공고 유형", example = "LIMITED_TIME") AnnouncementType announcementType,
    @Schema(description = "인터뷰 여부", example = "true") Boolean hasInterview,

    // 지원서
    @Schema(description = "지원서") ApplicationFormResponse application,

    // 기간정보
    @Schema(description = "지원 기간") PeriodResponse applicationPeriod,
    @Schema(description = "면접 기간") PeriodResponse interviewPeriod,
    @Schema(description = "서류 결과 기간") PeriodResponse documentResultPeriod,
    @Schema(description = "최종 발표 기간") PeriodResponse finalResultPeriod,

    // 이미지
    @Schema(description = "이미지") List<ImageResponse> images,
    @Schema(description = "태그", example = "[\"TAG1\", \"TAG2\"]") List<String> tags) {

  public static AnnouncementUpdateResponse from(Announcement announcement) {
    ApplicationFormResponse application =
        ApplicationFormResponse.from(announcement.getApplicationForm());
    PeriodResponse applicationPeriod =
        PeriodResponse.from(announcement.getAnnouncementPeriodInfo().applicationPeriod());
    PeriodResponse interviewPeriod =
        PeriodResponse.from(announcement.getAnnouncementPeriodInfo().interviewPeriod());
    PeriodResponse documentResultPeriod =
        PeriodResponse.from(announcement.getAnnouncementPeriodInfo().documentResultPeriod());
    PeriodResponse finalResultPeriod =
        PeriodResponse.from(announcement.getAnnouncementPeriodInfo().finalResultPeriod());

    List<ImageResponse> images =
        announcement.getImages().stream().map(ImageResponse::from).toList();
    List<String> tags = announcement.getTags().stream().map(Tag::label).toList();

    return AnnouncementUpdateResponse.builder()
        .announcementId(announcement.getId())
        .clubId(announcement.getClubId())
        .title(announcement.getTitle())
        .numberOfPeople(announcement.getNumberOfPeople())
        .detailDescription(announcement.getDetailDescription())
        .summaryDescription(announcement.getSummaryDescription())
        .announcementStatus(announcement.getAnnouncementStatus())
        .activityPeriod(announcement.getActivityPeriod())
        .target(announcement.getTarget())
            .field(announcement.getField())
        .announcementType(announcement.getAnnouncementType())
        .hasInterview(announcement.getHasInterview())
        .application(application)
        .applicationPeriod(applicationPeriod)
        .interviewPeriod(interviewPeriod)
        .documentResultPeriod(documentResultPeriod)
        .finalResultPeriod(finalResultPeriod)
        .images(images)
        .tags(tags)
        .build();
  }
}
