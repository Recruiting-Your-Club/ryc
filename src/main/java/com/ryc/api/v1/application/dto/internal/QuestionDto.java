package com.ryc.api.v1.application.dto.internal;

import com.ryc.api.v1.application.domain.question.Question;
import com.ryc.api.v1.application.domain.question.QuestionType;
import com.ryc.api.v1.recruitment.domain.Step;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record QuestionDto(String questionId, //TODO: 지원서 문항에 대한 요청의 응답시에만 필요한 값. 생성시 사용하는 DTO와, 응답시 사용하는 DTO를 분리하자.
                          @NotEmpty(message = "questionText shouldn't be empty") String questionText,
                          @NotNull(message = "questionType shouldn't be null") QuestionType questionType,
                          @NotNull(message = "questionOrder shouldn't be null") Integer questionOrder,
                          List<OptionDto> options) {

    public Question toQuestion(Step step) {
        return Question.builder()
                .step(step)
                .questionOrder(this.questionOrder)
                .questionText(this.questionText)
                .questionType(this.questionType)
                .build();
    }
}