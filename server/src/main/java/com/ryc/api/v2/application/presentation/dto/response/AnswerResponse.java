package com.ryc.api.v2.application.presentation.dto.response;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.QuestionOption;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AnswerResponse(
    @Schema(description = "질문 ID", example = "uuid-question-1") String questionId,
    @Schema(description = "질문 내용", example = "자기소개를 해주세요.") String questionLabel,
    @Schema(description = "질문 유형", example = "LONG_ANSWER") QuestionType questionType,
    @Schema(description = "서술형 답변", example = "안녕하세요...") String textAnswer,
    @Schema(description = "선택형 답변") List<AnswerChoiceResponse> choices,
    @Schema(description = "첨부 파일 URL", example = "https://.../file.pdf")
        String fileUrl // TODO: S3 연동 후 실제 URL 매핑 필요
    ) {
  public static AnswerResponse of(
      Answer answer, Question question, Map<String, QuestionOption> optionMap) {
    List<AnswerChoiceResponse> choiceResponses =
        answer.getChoices().stream()
            .map(choice -> AnswerChoiceResponse.of(choice, optionMap.get(choice.getOptionId())))
            .collect(Collectors.toList());

    return AnswerResponse.builder()
        .questionId(answer.getQuestionId())
        .questionLabel(question.getLabel())
        .questionType(question.getQuestionType())
        .textAnswer(answer.getTextAnswer())
        .choices(choiceResponses)
        .fileUrl(null) // TODO: S3 연동
        .build();
  }
}
