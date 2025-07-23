package com.ryc.api.v2.application.infra.entity;

import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.common.entity.BaseEntity;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

import lombok.*;

@Entity
@Table(name = "answers")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AnswerEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "application_id")
  private ApplicationEntity application;

  @Column(nullable = false, name = "question_id")
  private String questionId;

  @Column(columnDefinition = "TEXT")
  private String textAnswer;

  @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<AnswerChoiceEntity> choices;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "file_metadata_id")
  private FileMetadataEntity fileMetadata;
}
