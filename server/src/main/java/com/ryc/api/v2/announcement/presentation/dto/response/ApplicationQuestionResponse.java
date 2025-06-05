package com.ryc.api.v2.announcement.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;

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
public record ApplicationQuestionResponse(
    @Schema(description = "질문 유형", example = "LONG_ANSWER") QuestionType type,
    @Schema(description = "질문 내용", example = "자신의 개발 경험을 적어주세요.") String label,
    @Schema(description = "필수 여부", example = "true") Boolean isRequired,
    @Schema(description = "선택 옵션 목록 (SELECT 유형인 경우)") List<String> options) {
  public static ApplicationQuestionResponse from(ApplicationQuestion question) {
    if (question == null) {
      return null;
    }

    return ApplicationQuestionResponse.builder()
        .type(question.type())
        .label(question.label())
        .isRequired(question.isRequired())
        .options(question.options())
        .build();
  }
}
