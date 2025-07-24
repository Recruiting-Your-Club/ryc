package com.ryc.api.v2.applicationForm.infra.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.*;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Table(name = "application_forms")
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Setter
public class ApplicationFormEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ElementCollection
  @CollectionTable(name = "application_form_personal_info_questions")
  @OrderColumn(name = "display_order")
  @Enumerated(EnumType.STRING)
  private List<PersonalInfoQuestionType> personalInfoQuestions;

  @Setter
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "announcement_id", unique = true, nullable = false)
  private AnnouncementEntity announcement;

  @OneToMany(mappedBy = "applicationForm", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("displayOrder ASC")
  private List<QuestionEntity> questions;

  public void update(ApplicationFormEntity newForm) {
    this.personalInfoQuestions = newForm.getPersonalInfoQuestions();

    Map<String, QuestionEntity> existingQuestionsMap =
        this.questions.stream().collect(Collectors.toMap(QuestionEntity::getId, q -> q));

    List<QuestionEntity> updatedQuestions = new ArrayList<>();

    for (QuestionEntity newQuestion : newForm.getQuestions()) {
      QuestionEntity existingQuestion = existingQuestionsMap.get(newQuestion.getId());
      if (existingQuestion != null) {
        existingQuestion.update(newQuestion);
        updatedQuestions.add(existingQuestion);
        existingQuestionsMap.remove(newQuestion.getId());
      } else {
        newQuestion.setApplicationForm(this);
        updatedQuestions.add(newQuestion);
      }
    }

    this.questions.clear();
    this.questions.addAll(updatedQuestions);
  }
}
