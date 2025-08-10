package com.ryc.api.v2.application.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.domain.AnswerChoice;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AnswerResponse(
    // Question 정보
    @Schema(description = "질문 ID", example = "2ef2b4c5c-8d4c-4c4c-8d4c-2eef2b4c5c4c")
        String questionId,
    @Schema(description = "질문 내용", example = "자기소개를 해주세요.") String questionLabel,
    @Schema(description = "질문 유형", example = "LONG_ANSWER") QuestionType questionType,
    @Schema(description = "필수 여부", example = "true") Boolean isRequired,
    @Schema(description = "질문 선지 목록") List<QuestionOptionResponse> questionOptions,

    // 응답값
    @Schema(description = "서술형 답변", example = "안녕하세요...") String textAnswer,
    @Schema(description = "선택형 답변") List<String> selectedOptionIds,
    @Schema(description = "첨부 파일 URL", example = "https://.../file.pdf")
        String fileUrl // TODO: S3 연동 후 실제 URL 매핑 필요
    ) {
  public static AnswerResponse of(Answer answer, Question question) {
    List<QuestionOptionResponse> questionOptions =
        question.getOptions().stream().map(QuestionOptionResponse::from).toList();

    List<String> selectedOptionIds =
        answer.getChoices().stream().map(AnswerChoice::getOptionId).toList();

    return AnswerResponse.builder()
        .questionId(answer.getQuestionId())
        .questionLabel(question.getLabel())
        .isRequired(question.isRequired())
        .questionOptions(questionOptions)
        .questionType(question.getQuestionType())
        .textAnswer(answer.getTextAnswer())
        .selectedOptionIds(selectedOptionIds)
        .fileUrl(null) // TODO: S3 연동
        .build();
  }
}
