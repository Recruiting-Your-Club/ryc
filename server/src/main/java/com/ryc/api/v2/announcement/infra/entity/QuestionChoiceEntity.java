package com.ryc.api.v2.announcement.infra.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "question_choices")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionChoiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private ApplicationQuestionEntity applicationQuestionEntity;
}
