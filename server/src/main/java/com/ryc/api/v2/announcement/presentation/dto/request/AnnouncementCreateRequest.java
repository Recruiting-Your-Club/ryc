package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.common.dto.ClubRoleSecuredDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param clubRoleSecuredDto 동아리 권한 확인 dto
 * @param title 제목
 * @param periodInfo 기간 정보
 * @param numberOfPeople 모집 인원
 * @param detailDescription 상세 정보
 * @param summaryDescription 요약 소개
 * @param activityPeriod 활동 기간
 * @param target 모집 대상
 * @param announcementType 고객 타입
 * @param hasInterview 인터뷰 여부
 * @param tags 태그
 * @param images 이미지
 * @param application 공고 지원서
 * @brief 공고 생성 Request Dto
 */
@Builder
public record AnnouncementCreateRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        @Schema(description = "동아리 권한 확인 dto")
        @Valid
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotBlank(message = "title shouldn't be blank")
        @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집")
        String title,
    @NotNull(message = "announcementPeriod shouldn't be null") @Schema(description = "기간 정보") @Valid
        AnnouncementPeriodInfoRequest periodInfo,
    @NotNull(message = "numberOfPeople shouldn't be null")
        @Schema(description = "모집 인원", example = "10명 이내")
        String numberOfPeople,
    @NotBlank(message = "detailDescription shouldn't be blank")
        @Schema(description = "상세 정보", example = "코딩 동아리에서 신입 qnd 모집합니다. ")
        String detailDescription,
    @NotBlank(message = "summaryDescription shouldn't be blank")
        @Schema(description = "요약 소개", example = "코딩 동아리에서 신입 qnd 모집합니다.")
        String summaryDescription,
    @NotBlank(message = "activityPeriod shouldn't be blank")
        @Schema(description = "활동 기간", example = "2023-01-01 ~ 2023-12-31")
        String activityPeriod,
    @NotBlank(message = "target shouldn't be blank")
        @Schema(description = "모집 대상", example = "컴퓨터공학과 학생")
        String target,
    @NotNull(message = "announcementType shouldn't be null")
        @Schema(description = "공고 타입", example = "LIMITED_TIME")
        AnnouncementType announcementType,
    @Schema(description = "면접 여부", example = "true")
        @NotNull(message = "startDate shouldn't be null")
        Boolean hasInterview,
    @Schema(description = "태그 목록", example = "[\"프로그래밍\", \"웹개발\", \"백엔드\"]")
        @NotEmpty(message = "tags shouldn't be empty")
        List<@NotNull(message = "tag shouldn't be null") String> tags,
    @Schema(description = "공고 지원서") @NotNull(message = "application shouldn't be null") @Valid
        AnnouncementApplicationRequest application,
    @NotNull(message = "images shouldn't be null")
        @Schema(
            description = "이미지 목록",
            example = "[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\"]")
        List<@NotNull(message = "image shouldn't be null") ImageRequest> images) {

  @Override
  public List<String> tags() {
    return List.copyOf(tags);
  }

  @Override
  public List<ImageRequest> images() {
    return List.copyOf(images);
  }
}
