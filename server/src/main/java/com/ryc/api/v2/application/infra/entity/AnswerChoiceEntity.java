package com.ryc.api.v2.application.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.infra.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "answer_choices")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AnswerChoiceEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "answer_id")
  private AnswerEntity answer;

  @Column(nullable = false, name = "option_id")
  private String optionId;
}
