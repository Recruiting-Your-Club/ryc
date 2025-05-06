package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.announcement.domain.QuestionType;
import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "application_questions")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)

public class ApplicationQuestionEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Enumerated(value = EnumType.STRING)
    private QuestionType questionType;

    private String label;
    private boolean isRequired;
    private int order;

}
