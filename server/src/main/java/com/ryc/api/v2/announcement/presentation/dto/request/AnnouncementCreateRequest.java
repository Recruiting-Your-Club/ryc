package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import com.ryc.api.v2.common.dto.ClubRoleSecuredDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;

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
        ClubRoleSecuredDto clubRoleSecuredDto,
        @NotBlank(message = "clubId shouldn't be blank") String clubId,
        @NotBlank(message = "title shouldn't be blank") String title,
    @NotNull(message = "announcementPeriod shouldn't be null")
        AnnouncementPeriodInfoRequest periodInfo,
    @NotNull(message = "numberOfPeople shouldn't be null") String numberOfPeople,
    @NotBlank(message = "detailDescription shouldn't be blank") String detailDescription,
    @NotBlank(message = "summaryDescription shouldn't be blank") String summaryDescription,
    @NotBlank(message = "activityPeriod shouldn't be blank") String activityPeriod,
    @NotBlank(message = "target shouldn't be blank") String target,
    @NotEmpty(message = "announcementType shouldn't be empty") AnnouncementType announcementType,
    @NotNull(message = "startDate shouldn't be null") Boolean hasInterview,
    @NotEmpty(message = "tags shouldn't be empty")
        List<@NotNull(message = "tag shouldn't be null") String> tags,
    @NotNull(message = "application shouldn't be null") AnnouncementApplicationRequest application,
    List<@NotBlank(message = "image shouldn't be blank") ImageRequest> images) {

  @Override
  public List<String> tags() {
    return List.copyOf(tags);
  }

  @Override
  public List<ImageRequest> images() {
    return List.copyOf(images);
  }
}
