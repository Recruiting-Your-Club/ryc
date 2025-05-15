package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import com.ryc.api.v2.announcement.presentation.dto.request.AdditionalQuestion;
import com.ryc.api.v2.announcement.presentation.dto.request.Question;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Objects;

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

    @Override
    public int hashCode() {
        return Objects.hash(type, label, isRequired, order, options);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        ApplicationQuestion that = (ApplicationQuestion) obj;
        return isRequired == that.isRequired &&
               order == that.order &&
               type == that.type &&
               Objects.equals(label, that.label) &&
               Objects.equals(options, that.options);
    }
}
