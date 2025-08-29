package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionCreateRequest(
    @Schema(description = "질문 타입", example = "MULTIPLE_CHOICE")
        @NotNull(message = "질문 타입은 null일 수 없습니다.")
        QuestionType questionType,
    @Schema(description = "질문", example = "개발자의 성장 과정에서 중요하게 생각하는 가치를 서술해 주십시오.")
        @NotBlank(message = "질문은 빈 값일 수 없습니다.")
        @Size(max = 500, message = "질문은 500자를 넘어갈 수 없습니다.")
        String label,
    @Schema(description = "질문 설명", example = "자유롭게 서술해 주십시오 (500자 이하)")
        @Size(max = 200, message = "질문 설명은 200자를 넘어갈 수 없습니다.")
        String description,
    @Schema(description = "필수 여부", example = "true")
        @NotNull(message = "질문 필수 여부는 null일 수 없습니다. true/false가 필요합니다.")
        boolean isRequired,
    @Schema(description = "선택 옵션 목록")
        List<@NotNull(message = "각 질문 선지는 null 일 수 없습니다.") @Valid QuestionOptionCreateRequest>
            options) {
  public QuestionCreateRequest {
    options = options == null ? List.of() : options;
  }
}
