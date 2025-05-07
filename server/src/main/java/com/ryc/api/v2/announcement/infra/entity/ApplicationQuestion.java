package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.announcement.domain.question.QuestionType;
import jakarta.persistence.*;

@Embeddable
public class ApplicationQuestion {
    @Enumerated(value = EnumType.STRING)
    private QuestionType questionType;
    private String label;
    private boolean isRequired;
    private int order;
}
