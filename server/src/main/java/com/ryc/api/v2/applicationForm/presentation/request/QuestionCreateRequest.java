package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionCreateRequest(
    @Schema(description = "질문 타입", example = "MULTIPLE_CHOICE") @NotNull QuestionType questionType,
    @Schema(description = "질문 제목", example = "질문 제목") @NotBlank String label,
    @Schema(description = "필수 여부", example = "true") @NotNull boolean isRequired,
    @Schema(description = "선택 옵션 목록") List<@NotBlank @Valid QuestionOptionCreateRequest> options) {
  public QuestionCreateRequest {
    options = options == null ? List.of() : options;
  }
}
