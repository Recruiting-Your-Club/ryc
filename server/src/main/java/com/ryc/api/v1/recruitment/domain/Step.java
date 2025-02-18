package com.ryc.api.v1.recruitment.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v1.application.domain.question.Question;
import com.ryc.api.v1.common.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Step extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "step_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recruitment_id")
  private Recruitment recruitment;

  @Enumerated(EnumType.STRING)
  private StepType stepType;

  private String stepName;
  private boolean deleted;

  @OneToMany(mappedBy = "step", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Question> questions = new ArrayList<>();
}
