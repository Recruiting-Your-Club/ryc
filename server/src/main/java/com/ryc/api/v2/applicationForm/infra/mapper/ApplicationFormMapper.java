package com.ryc.api.v2.applicationForm.infra.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionCategory;
import com.ryc.api.v2.applicationForm.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.applicationForm.infra.entity.QuestionEntity;

public class ApplicationFormMapper {

  public static ApplicationForm toDomain(ApplicationFormEntity entity) {
    List<Question> applicationQuestions =
        entity.getQuestions().stream()
            .filter(q -> q.getCategory() == QuestionCategory.QUESTION)
            .map(QuestionMapper::toDomain)
            .toList();
    List<Question> preQuestions =
        entity.getQuestions().stream()
            .filter(q -> q.getCategory() == QuestionCategory.PRE_QUESTION)
            .map(QuestionMapper::toDomain)
            .toList();

    return ApplicationForm.builder()
        .id(entity.getId())
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestionTypes(entity.getPersonalInfoQuestions())
        .preQuestions(preQuestions)
        .build();
  }

  public static ApplicationFormEntity toEntity(ApplicationForm applicationForm) {
    ApplicationFormEntity formEntity =
        ApplicationFormEntity.builder()
            .id(applicationForm.getId())
            .personalInfoQuestions(new ArrayList<>(applicationForm.getPersonalInfoQuestionTypes()))
            .build();

    List<QuestionEntity> questions = new ArrayList<>();

    List<QuestionEntity> applicationQuestions =
        IntStream.range(0, applicationForm.getApplicationQuestions().size())
            .mapToObj(
                i -> {
                  QuestionEntity questionEntity =
                      QuestionMapper.toEntity(applicationForm.getApplicationQuestions().get(i), i);
                  questionEntity.setApplicationForm(formEntity);
                  return questionEntity;
                })
            .collect(Collectors.toCollection(ArrayList::new));

    List<QuestionEntity> preQuestions =
        IntStream.range(0, applicationForm.getPreQuestions().size())
            .mapToObj(
                i -> {
                  QuestionEntity questionEntity =
                      QuestionMapper.toEntity(applicationForm.getPreQuestions().get(i), i);
                  questionEntity.setApplicationForm(formEntity);
                  return questionEntity;
                })
            .collect(Collectors.toCollection(ArrayList::new));

    questions.addAll(applicationQuestions);
    questions.addAll(preQuestions);

    formEntity.setQuestions(questions);
    return formEntity;
  }
}
