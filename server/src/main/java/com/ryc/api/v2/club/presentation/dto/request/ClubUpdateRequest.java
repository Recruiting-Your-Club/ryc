package com.ryc.api.v2.club.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubUpdateRequest(
    @Schema(description = "동아리 이름")
        @NotBlank(message = "동아리 이름은 비워둘 수 없습니다. 수정되지 않았다면 기존의 값을 입력해주세요.")
        @Min(value = 2, message = "동아리 이름은 2자 이상이어야 합니다.")
        @Max(value = 50, message = "동아리 이름은 50자 이하여야 합니다.")
        String name,
    @Schema(description = "동아리 간단 설명")
        @NotBlank(message = "동아리 간단 설명(shortDescription)은 비워둘 수 없습니다. 수정되지 않았다면 기존의 값을 입력해주세요.")
        @Max(value = 200, message = "동아리 간단 설명(shortDescription)은 200자를 초과할 수 없습니다.")
        String shortDescription,
    @Schema(description = "동아리 상세 설명")
        @Max(value = 5000, message = "동아리 상세설명은 최대 5000자까지 입력 가능합니다.")
        String detailDescription,
    @Schema(description = "동아리 대표 이미지") @UUID(message = "동아리 대표이미지 메타데이터 ID는 UUID를 준수해야 합니다.")
        String representativeImage,
    @Schema(
            description = "동아리 카테고리",
            allowableValues = {
              "PERFORMANCE_ARTS",
              "CULTURE",
              "SPORTS",
              "ACADEMIC",
              "VOLUNTEER",
              "RELIGION"
            })
        @NotBlank(message = "동아리 카테고리는 비워둘 수 없습니다.")
        String category,
    @Schema(description = "동아리 태그 리스트") @Valid List<ClubTagRequest> clubTags,
    @Schema(description = "동아리 요약 리스트") @Valid List<ClubSummaryRequest> clubSummaries,
    @Schema(description = "동아리 상세 이미지 리스트") @Valid
        List<
                @NotBlank(message = "동아리 상세 이미지 메타데이터ID는 빈값일 수 없습니다.")
                @UUID(message = "동아리 상세 이미지 메타데이터ID는 UUID 포멧이어야 합니다.") String>
            clubDetailImages) {

  public ClubUpdateRequest {
    clubTags = clubTags == null ? List.of() : clubTags;
    clubSummaries = clubSummaries == null ? List.of() : clubSummaries;
    clubDetailImages = clubDetailImages == null ? List.of() : clubDetailImages;
  }

  @Override
  public List<ClubTagRequest> clubTags() {
    return List.copyOf(clubTags);
  }

  @Override
  public List<ClubSummaryRequest> clubSummaries() {
    return List.copyOf(clubSummaries);
  }

  @Override
  public List<String> clubDetailImages() {
    return List.copyOf(clubDetailImages);
  }
}
