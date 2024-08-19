package com.ryc.api.v1.application.domain;

import com.ryc.api.v1.recruitment.domain.Step;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "question_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;

    private Integer questionOrder;

    @Column(columnDefinition = "TEXT")
    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    @Builder.Default
    private boolean isAccessible = true;
    //평가원이 읽을 수 있는 정보인지 유뮤를 판단하는 지표

    //객관식인 경우에만 선지 데이터 조인
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MultipleChoiceOption> multipleChoiceOptions = new ArrayList<>();
}
