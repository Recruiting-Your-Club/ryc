package com.ryc.api.v2.applicationForm.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "question_options")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Setter
public class QuestionOptionEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "option_text", nullable = false)
  private String option;

  @Column(name = "display_order")
  private int displayOrder;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_id")
  private QuestionEntity question;
}
