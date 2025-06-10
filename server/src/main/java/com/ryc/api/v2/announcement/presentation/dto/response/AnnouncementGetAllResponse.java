package com.ryc.api.v2.announcement.presentation.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.Tag;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param announcementId 공고 ID
 * @param title 공고 제목
 * @param summaryDescription 요약 설명
 * @param target 대상
 * @param announcementStatus 공고 상태
 * @param announcementType 공고 유형
 * @param applicationStartDate 지원 시작 날짜
 * @param applicationEndDate 지원 마감 날짜
 * @param tags 태그 목록
 * @brief 공고 목록 조회 응답 DTO
 */
@Builder
public record AnnouncementGetAllResponse(
    @Schema(description = "공고 ID", example = "123e4567-e89b-12d3-a456-426614174000")
        String announcementId,
    @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집") String title,
    @Schema(description = "요약 설명", example = "코딩 동아리에서 신입 qnd 모집합니다.") String summaryDescription,
    @Schema(description = "대상", example = "컴퓨터공학과 학생") String target,
    @Schema(description = "공고 상태", example = "RECRUITING") AnnouncementStatus announcementStatus,
    @Schema(description = "공고 유형", example = "LIMITED_TIME") AnnouncementType announcementType,
    @Schema(description = "지원 시작 날짜", example = "2025-06-01T09:00", type = "string")
        LocalDateTime applicationStartDate,
    @Schema(description = "지원 마감 날짜", example = "2025-06-30T18:00", type = "string")
        LocalDateTime applicationEndDate,
    @Schema(description = "태그 목록", example = "[\"프로그래밍\", \"웹개발\", \"백엔드\"]") List<String> tags) {
  public static AnnouncementGetAllResponse from(Announcement announcement) {
    return AnnouncementGetAllResponse.builder()
        .announcementId(announcement.getId())
        .title(announcement.getTitle())
        .summaryDescription(announcement.getSummaryDescription())
        .target(announcement.getTarget())
        .announcementStatus(announcement.getAnnouncementStatus())
        .announcementType(announcement.getAnnouncementType())
        .applicationStartDate(
            announcement.getAnnouncementPeriodInfo().applicationPeriod().startDate())
        .applicationEndDate(announcement.getAnnouncementPeriodInfo().applicationPeriod().endDate())
        .tags(announcement.getTags().stream().map(Tag::label).toList())
        .build();
  }
}
