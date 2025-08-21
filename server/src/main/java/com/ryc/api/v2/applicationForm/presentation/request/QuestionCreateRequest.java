package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionCreateRequest(
    @Schema(description = "질문 타입", example = "MULTIPLE_CHOICE") @NotNull QuestionType questionType,
    @Schema(description = "질문 제목", example = "개발자의 성장 과정에서 중요하게 생각하는 가치를 서술해 주십시오.") @NotBlank
        String label,
    @Schema(description = "질문 설명", example = "자유롭게 서술해 주십시오 (500자 이하)") String description,
    @Schema(description = "필수 여부", example = "true") @NotNull boolean isRequired,
    @Schema(description = "선택 옵션 목록") List<@NotBlank @Valid QuestionOptionCreateRequest> options) {
  public QuestionCreateRequest {
    options = options == null ? List.of() : options;
  }
}
