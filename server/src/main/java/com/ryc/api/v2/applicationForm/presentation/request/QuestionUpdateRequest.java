package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import org.hibernate.validator.constraints.UUID;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionUpdateRequest(
    @Schema(description = "질문 ID", example = "e23e4567-e89b-12d3-a456-426614174000")
        @NotBlank(message = "질문 id는 빈값일 수 없습니다.")
        @UUID(message = "질문 id는 UUID 포멧이어야 합니다.")
        String id,
    @Schema(description = "질문 타입", example = "MULTIPLE_CHOICE")
        @NotNull(message = "질문 타입은 null일 수 없습니다.")
        QuestionType questionType,
    @Schema(description = "질문", example = "개발자의 성장 과정에서 중요하게 생각하는 가치를 서술해 주십시오.")
        @NotBlank(message = "질문은 빈 값일 수 없습니다.")
        @Max(value = 500, message = "질문은 500자를 넘어갈 수 없습니다.")
        String label,
    @Schema(description = "질문 설명", example = "자유롭게 서술해 주십시오 (500자 이하)")
        @Max(value = 200, message = "질문 설명은 200자를 넘어갈 수 없습니다.")
        String description,
    @Schema(description = "필수 여부", example = "true")
        @NotNull(message = "질문 필수 여부는 null일 수 없습니다. true/false가 필요합니다.")
        boolean isRequired,
    @Schema(description = "선택 옵션 목록", example = "[\"보기1\",\"보기2\"]")
        List<@NotNull(message = "각 질문 선지는 null 일 수 없습니다.") @Valid QuestionOptionUpdateRequest>
            options) {
  public QuestionUpdateRequest {
    options = options == null ? List.of() : options;
    id = id == null ? DomainDefaultValues.DEFAULT_INITIAL_ID : id;
  }
}
