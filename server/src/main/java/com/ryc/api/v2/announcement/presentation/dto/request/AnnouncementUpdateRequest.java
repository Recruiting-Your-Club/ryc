package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.applicationForm.presentation.request.ApplicationFormUpdateRequest;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param title 제목
 * @param periodInfo 기간 정보
 * @param numberOfPeople 모집 인원
 * @param detailDescription 상세 소개
 * @param summaryDescription 요약 소개
 * @param activityPeriod 활동 기간
 * @param target 모집 대상
 * @param field 모집 분야
 * @param announcementType 공고 타입
 * @param hasInterview 면접여부
 * @param tags 태그
 * @param applicationForm 지원서
 * @param images 이미지
 */
@Builder
public record AnnouncementUpdateRequest(
    @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집")
        @NotBlank(message = "title shouldn't be blank")
        String title,
    @Schema(description = "기간 정보") @Valid @NotNull(message = "periodInfo shouldn't be null")
        AnnouncementPeriodInfoRequest periodInfo,
    @Schema(description = "모집 인원", example = "10명 이내")
        @NotNull(message = "numberOfPeople shouldn't be null")
        String numberOfPeople,
    @Schema(description = "상세 정보", example = "코딩 동아리에서 신입 qnd 모집합니다. ")
        @NotBlank(message = "detailDescription shouldn't be blank")
        String detailDescription,
    @Schema(description = "요약 소개", example = "코딩 동아리에서 신입 qnd 모집합니다.")
        @NotBlank(message = "summaryDescription shouldn't be blank")
        String summaryDescription,
    @Schema(description = "활동 기간", example = "2023-01-01 ~ 2023-12-31")
        @NotBlank(message = "activityPeriod shouldn't be blank")
        String activityPeriod,
    @Schema(description = "모집 대상", example = "컴퓨터공학과 학생")
        @NotBlank(message = "target shouldn't be blank")
        String target,
    @Schema(description = "모집 분야", example = "백엔드") @NotBlank(message = "target shouldn't be blank")
        String field,
    @Schema(description = "공고 타입", example = "LIMITED_TIME")
        @NotNull(message = "announcementType shouldn't be null")
        AnnouncementType announcementType,
    @NotNull(message = "tags shouldn't be null")
        List<@NotBlank(message = "tag shouldn't be blank") String> tags,
    @Schema(description = "공고 지원서") @Valid @NotNull(message = "applicationForm shouldn't be null")
        ApplicationFormUpdateRequest applicationForm,
    @Schema(description = "이미지 목록") @NotNull(message = "images shouldn't be null")
        List<@Valid @NotNull(message = "image shouldn't be null") String> images) {
  @Schema(description = "태그", example = "[\"프로그래밍\", \"웹개발\", \"백엔드\"]")
  @Override
  public List<String> tags() {
    return List.copyOf(tags);
  }

  @Override
  public List<String> images() {
    return List.copyOf(images);
  }
}
