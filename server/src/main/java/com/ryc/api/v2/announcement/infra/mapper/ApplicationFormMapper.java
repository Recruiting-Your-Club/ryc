package com.ryc.api.v2.announcement.infra.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.ApplicationForm;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApplicationFormMapper {

  private final ApplicationQuestionMapper applicationQuestionMapper;

  /** entity to Domain */
  public ApplicationForm toDomain(ApplicationFormEntity entity) {
    List<ApplicationQuestion> applicationQuestions =
        entity.getApplicationQuestions().stream().map(applicationQuestionMapper::toDomain).toList();
    List<ApplicationQuestion> preQuestions =
        entity.getPreQuestions().stream().map(applicationQuestionMapper::toDomain).toList();

    return ApplicationForm.builder()
        .id(entity.getId())
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestionTypes(entity.getPersonalInfoQuestions())
        .preQuestions(preQuestions)
        .build();
  }

  /** save시 announcement 주입 mapping */
  public ApplicationFormEntity toEntity(ApplicationForm applicationForm) {
    List<ApplicationQuestionVO> applicationQuestions =
        applicationForm.getApplicationQuestions().stream()
            .map(applicationQuestionMapper::toVO)
            .toList();

    List<ApplicationQuestionVO> preQuestions =
        applicationForm.getPreQuestions().stream().map(applicationQuestionMapper::toVO).toList();

    return ApplicationFormEntity.builder()
        .id(applicationForm.getId())
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestions(applicationForm.getPersonalInfoQuestionTypes())
        .preQuestions(preQuestions)
        .build();
  }
}
