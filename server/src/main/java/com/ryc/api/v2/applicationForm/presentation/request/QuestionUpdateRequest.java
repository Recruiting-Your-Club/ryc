package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionUpdateRequest(
    @Schema(description = "질문 ID", example = "e23e4567-e89b-12d3-a456-426614174000") @NotBlank
        String id,
    @Schema(description = "질문 타입", example = "MULTIPLE_CHOICE") @NotNull QuestionType questionType,
    @Schema(description = "질문 제목", example = "질문 제목") @NotBlank String label,
    @Schema(description = "필수 여부", example = "true") @NotNull boolean isRequired,
    @Schema(description = "선택 옵션 목록", example = "[\"보기1\",\"보기2\"]")
        List<@NotBlank @Valid QuestionOptionUpdateRequest> options) {
  public QuestionUpdateRequest {
    options = options == null ? List.of() : options;
    id = id == null ? DomainDefaultValues.DEFAULT_INITIAL_ID : id;
  }
}
