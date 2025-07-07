package com.ryc.api.v2.announcement.infra.entity;

import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Table(name = "application_forms")
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicationFormEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ElementCollection
  @CollectionTable(name = "application_questions")
  @OrderColumn(name = "application_question_order")
  private List<ApplicationQuestionVO> applicationQuestions;

  @ElementCollection
  @CollectionTable(name = "application_personal_info_questions")
  @OrderColumn(name = "personal_info_question_order")
  @Enumerated(EnumType.STRING)
  private List<PersonalInfoQuestionType> personalInfoQuestions;

  @ElementCollection
  @CollectionTable(name = "application_pre_questions")
  @OrderColumn(name = "pre_question_order")
  private List<ApplicationQuestionVO> preQuestions;

  @Setter
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "announcement_id", unique = true, nullable = false)
  private AnnouncementEntity announcement;

  public void update(ApplicationFormEntity applicationForm) {
    this.applicationQuestions = applicationForm.getApplicationQuestions();
    this.personalInfoQuestions = applicationForm.getPersonalInfoQuestions();
    this.preQuestions = applicationForm.getPreQuestions();
  }
}
