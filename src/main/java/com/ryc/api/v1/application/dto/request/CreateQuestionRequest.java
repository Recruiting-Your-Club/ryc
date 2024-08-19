package com.ryc.api.v1.application.dto.request;

import com.ryc.api.v1.application.domain.MultipleChoiceOption;
import com.ryc.api.v1.application.domain.Question;
import com.ryc.api.v1.application.domain.QuestionType;
import com.ryc.api.v1.recruitment.domain.Step;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateQuestionRequest(@NotEmpty(message = "stepId shouldn't be empty") String stepId,
                                    @NotEmpty(message = "questions shouldn't be empty") List<QuestionDto> questions) {

    public record QuestionDto(@NotEmpty(message = "questionText shouldn't be empty") String questionText,
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

    public record OptionDto(@NotNull(message = "optionOrder shouldn't be null") Integer optionOrder,
                            @NotEmpty(message = "optionText shouldn't be empty") String optionText) {

        public MultipleChoiceOption toMultipleChoiceOption(Question question) {
            return MultipleChoiceOption.builder()
                    .question(question)
                    .optionOrder(this.optionOrder)
                    .optionText(optionText)
                    .build();
        }
    }
}
