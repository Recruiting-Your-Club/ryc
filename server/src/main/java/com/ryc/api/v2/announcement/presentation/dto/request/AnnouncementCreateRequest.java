package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.hibernate.validator.constraints.UUID;

import com.ryc.api.v2.applicationForm.presentation.request.ApplicationFormCreateRequest;
import com.ryc.api.v2.common.validator.request.annotation.NullOrNotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param title 제목
 * @param periodInfo 기간 정보
 * @param numberOfPeople 모집 인원
 * @param detailDescription 상세 정보
 * @param summaryDescription 요약 소개
 * @param activityPeriod 활동 기간
 * @param target 모집 대상
 * @param field 모집 분야
 * @param announcementType 고객 타입
 * @param tags 태그
 * @param images 이미지
 * @param applicationForm 공고 지원서
 */
@Builder
public record AnnouncementCreateRequest(
    @NotBlank(message = "공고 제목은 필수 항목입니다.")
        @Min(value = 2, message = "공고 제목의 최소길이는 2자입니다.")
        @Max(value = 100, message = "공고 제목의 최대길이는 100자입니다.")
        @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집")
        String title,
    @NotNull(message = "공고 기한 정보 필드는 빈값일 수 없습니다. 최소 지원서 접수기간은 필수 입력해주십시오.") @Valid
        AnnouncementPeriodInfoRequest periodInfo,
    @NullOrNotBlank
        @Max(value = 50, message = "모집인원의 최대길이는 50자입니다.")
        @Schema(description = "모집 인원", example = "10명 이내")
        String numberOfPeople,
    @NullOrNotBlank
        @Max(value = 10000, message = "공고 상세 설명은 10000자를 초과할 수 없습니다.")
        @Schema(description = "상세 정보", example = "코딩 동아리에서 신입 qnd 모집합니다. ")
        String detailDescription,
    @NullOrNotBlank
        @Max(value = 300, message = "공고 요약 설명은 300자를 초과할 수 없습니다.")
        @Schema(description = "요약 소개", example = "코딩 동아리에서 신입 qnd 모집합니다.")
        String summaryDescription,
    @NullOrNotBlank
        @Max(value = 100, message = "활동 기간은 100자를 초과할 수 없습니다.")
        @Schema(description = "활동 기간", example = "2023-01-01 ~ 2023-12-31")
        String activityPeriod,
    @NullOrNotBlank
        @Max(value = 50, message = "모집 대상은 50자를 초과할 수 없습니다.")
        @Schema(description = "모집 대상", example = "컴퓨터공학과 학생")
        String target,
    @NullOrNotBlank
        @Max(value = 50, message = "모집 분야는 50자를 초과할 수 없습니다.")
        @Schema(description = "모집 분야", example = "백엔드")
        String field,
    @NotBlank(message = "공고타입은 빈 값일 수 없습니다. ALWAYS_OPEN과 LIMITED_TIME만 허용 가능합니다.")
        @Schema(
            description = "공고 타입",
            example = "LIMITED_TIME",
            allowableValues = {"ALWAYS_OPEN", "LIMITED_TIME"})
        String announcementType,
    List<@NotBlank(message = "각 동아리 태그는 빈값일 수 없습니다.") String> tags,
    @NotNull(message = "applicationForm 필드를") @Schema(description = "공고 지원서") @Valid
        ApplicationFormCreateRequest applicationForm,
    List<@NotBlank @UUID(message = "이미지 메타데이터 id는 UUID 포멧을 준수하여야 합니다.") String> images) {

  // @Schema는 get함수에 사용해야 작동함.
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
