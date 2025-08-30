package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import org.hibernate.validator.constraints.UUID;

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
 * @param tags 태그
 * @param applicationForm 지원서
 * @param images 이미지
 */
@Builder
public record AnnouncementUpdateRequest(
    @Schema(description = "공고 제목", example = "2025년도 상반기 신입 모집")
        @NotBlank(message = "공고 제목은 필수 항목입니다.")
        @Size(min = 2, max = 200, message = "공고 제목의 길이는 2자 이상 200자이하 입니다.")
        String title,
    @Schema(description = "기간 정보")
        @NotNull(message = "공고 기한 정보 필드는 빈값일 수 없습니다. 최소 지원서 접수기간은 필수 입력해주십시오.")
        @Valid
        AnnouncementPeriodInfoRequest periodInfo,
    @Schema(description = "모집 인원", example = "10명 이내")
        @Size(max = 50, message = "모집인원의 최대길이는 50자입니다.")
        String numberOfPeople,
    @Schema(description = "상세 정보", example = "코딩 동아리에서 신입 qnd 모집합니다. ")
        @Size(max = 10000, message = "공고 상세 설명은 10000자를 초과할 수 없습니다.")
        String detailDescription,
    @Schema(description = "요약 소개", example = "코딩 동아리에서 신입 qnd 모집합니다.")
        @Size(max = 300, message = "공고 요약 설명은 300자를 초과할 수 없습니다.")
        String summaryDescription,
    @Schema(description = "활동 기간", example = "2023-01-01 ~ 2023-12-31")
        @Size(max = 100, message = "활동 기간은 100자를 초과할 수 없습니다.")
        String activityPeriod,
    @Schema(description = "모집 대상", example = "컴퓨터공학과 학생")
        @Size(max = 50, message = "모집 대상은 50자를 초과할 수 없습니다.")
        String target,
    @Schema(description = "모집 분야", example = "백엔드")
        @Size(max = 50, message = "모집 분야는 50자를 초과할 수 없습니다.")
        String field,
    @Schema(
            description = "공고 타입",
            example = "LIMITED_TIME",
            allowableValues = {"ALWAYS_OPEN", "LIMITED_TIME"})
        @NotBlank(message = "공고타입은 빈 값일 수 없습니다. ALWAYS_OPEN과 LIMITED_TIME만 허용 가능합니다.")
        String announcementType,
    List<
            @NotBlank(message = "각 공고 태그는 빈값일 수 없습니다.")
            @Size(max = 20, message = "공고 태그 글자 수는 20자를 초과할 수 없습니다.") String>
        tags,
    @Schema(description = "공고 지원서") @NotNull(message = "applicationForm 필드를 빈값으로 둘 수 없습니다.") @Valid
        ApplicationFormUpdateRequest applicationForm,
    @Schema(description = "이미지 목록")
        List<
                @NotBlank(message = "이미지 메타데이터 id는 빈 값일 수 없습니다.")
                @UUID(message = "이미지 메타데이터 id는 UUID 포멧을 준수하여야 합니다.") String>
            images) {
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
