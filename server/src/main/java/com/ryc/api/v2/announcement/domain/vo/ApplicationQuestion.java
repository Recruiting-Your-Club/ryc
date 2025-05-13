package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import com.ryc.api.v2.announcement.presentation.dto.request.AdditionalQuestion;
import com.ryc.api.v2.announcement.presentation.dto.request.Question;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ApplicationQuestion {
    private final QuestionType type;
    private final String label;
    private final boolean isRequired;
    private final int order;
    private final List<String> options;

    public static ApplicationQuestion initialize(Question question, int order){
        return ApplicationQuestion.builder()
                .type(QuestionType.LONG_ANSWER)
                .label(question.label())
                .isRequired(question.isRequired())
                .order(order)
                .build();
    }
    public static ApplicationQuestion initialize(AdditionalQuestion question, int order){
        return ApplicationQuestion.builder()
                .type(question.questionType())
                .label(question.label())
                .isRequired(question.isRequired())
                .options(question.options())
                .order(order)
                .build();
    }
}
