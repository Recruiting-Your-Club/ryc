package com.ryc.api.v1.application.dto.internal;

import com.ryc.api.v1.application.domain.question.MultipleChoiceOption;
import com.ryc.api.v1.application.domain.question.Question;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record OptionDto(String optionId,
                        @NotNull(message = "optionOrder shouldn't be null") Integer optionOrder,
                        @NotEmpty(message = "optionText shouldn't be empty") String optionText) {

    public MultipleChoiceOption toMultipleChoiceOption(Question question) {
        return MultipleChoiceOption.builder()
                .question(question)
                .optionOrder(this.optionOrder)
                .optionText(optionText)
                .build();
    }
}