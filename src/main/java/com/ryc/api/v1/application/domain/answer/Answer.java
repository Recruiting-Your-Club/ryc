package com.ryc.api.v1.application.domain.answer;

import com.ryc.api.v1.application.domain.question.MultipleChoiceOption;
import com.ryc.api.v1.application.domain.question.Question;
import com.ryc.api.v1.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "answer_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private Application application;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_by_multiple_choice")
    private MultipleChoiceOption answerByMultipleChoice;

    @Column(columnDefinition = "TEXT")
    private String answerBySubjective;

    @Builder.Default
    private boolean deleted = false;
}
