package com.ryc.api.v2.announcement.infra.vo;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Embeddable
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicationQuestionVO {
    @Enumerated(value = EnumType.STRING)
    private QuestionType questionType;
    private String label;
    private boolean isRequired;
    private int order;

    @ElementCollection
    @CollectionTable(name = "application_question_options")
    private List<String> options;
}
