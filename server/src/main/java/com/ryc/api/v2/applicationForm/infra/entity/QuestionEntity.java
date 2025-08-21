package com.ryc.api.v2.applicationForm.infra.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.*;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionCategory;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Setter
public class QuestionEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String label;
  private String description;
  private boolean isRequired;

  @Column(name = "display_order")
  private int displayOrder;

  @Enumerated(value = EnumType.STRING)
  private QuestionType questionType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "application_form_id")
  private ApplicationFormEntity applicationForm;

  @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("displayOrder ASC")
  private List<QuestionOptionEntity> options;

  @Enumerated(value = EnumType.STRING)
  private QuestionCategory category;

  public void update(QuestionEntity newQuestion) {
    this.label = newQuestion.getLabel();
    this.description = newQuestion.getDescription();
    this.isRequired = newQuestion.isRequired();
    this.displayOrder = newQuestion.getDisplayOrder();
    this.questionType = newQuestion.getQuestionType();
    this.category = newQuestion.getCategory();

    Map<String, QuestionOptionEntity> existingOptionsMap =
        this.options.stream()
            .collect(Collectors.toMap(QuestionOptionEntity::getId, option -> option));

    List<QuestionOptionEntity> updatedOptions = new ArrayList<>();

    for (QuestionOptionEntity newOption : newQuestion.getOptions()) {
      QuestionOptionEntity existingOption = existingOptionsMap.get(newOption.getId());
      if (existingOption != null) {
        existingOption.setOption(newOption.getOption());
        existingOption.setDisplayOrder(newOption.getDisplayOrder());
        updatedOptions.add(existingOption);
        existingOptionsMap.remove(newOption.getId());
      } else {
        newOption.setQuestion(this);
        updatedOptions.add(newOption);
      }
    }

    this.options.clear();
    this.options.addAll(updatedOptions);
  }
}
