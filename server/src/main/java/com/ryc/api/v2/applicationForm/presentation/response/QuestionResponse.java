package com.ryc.api.v2.applicationForm.presentation.response;

import java.util.List;

import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param type 질문 유형
 * @param label 질문 내용
 * @param isRequired 필수 응답 여부
 * @param options 선택 옵션 목록 ( SELECT 유형인 경우 )
 * @brief 지원서 질문 Response Dto
 */
@Builder
public record QuestionResponse(
    @Schema(description = "질문 ID", example = "e23e4567-e89b-12d3-a456-426614174000") String id,
    @Schema(description = "질문 유형", example = "LONG_ANSWER") QuestionType type,
    @Schema(description = "질문 내용", example = "자신의 개발 경험을 적어주세요.") String label,
    @Schema(description = "필수 여부", example = "true") Boolean isRequired,
    @Schema(description = "선택 옵션 목록 (SELECT 유형인 경우)", example = "[\"보기1\",\"보기2\"]")
        List<QuestionOptionResponse> options) {
  public static QuestionResponse from(Question question) {
    if (question == null) {
      return null;
    }

    List<QuestionOptionResponse> options =
        question.getOptions().stream().map(QuestionOptionResponse::from).toList();

    return QuestionResponse.builder()
        .id(question.getId())
        .type(question.getQuestionType())
        .label(question.getLabel())
        .isRequired(question.isRequired())
        .options(options)
        .build();
  }
}
