package com.ryc.api.v2.applicationForm.infra.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.QuestionOption;
import com.ryc.api.v2.applicationForm.infra.entity.QuestionEntity;
import com.ryc.api.v2.applicationForm.infra.entity.QuestionOptionEntity;

public class QuestionMapper {

  public static Question toDomain(QuestionEntity question) {
    List<QuestionOption> options =
        question.getOptions().stream().map(QuestionOptionMapper::toDomain).toList();

    return Question.builder()
        .id(question.getId())
        .questionType(question.getQuestionType())
        .label(question.getLabel())
        .isRequired(question.isRequired())
        .category(question.getCategory())
        .options(options)
        .build();
  }

  public static QuestionEntity toEntity(Question question, int displayOrder) {
    QuestionEntity questionEntity =
        QuestionEntity.builder()
            .id(question.getId())
            .questionType(question.getQuestionType())
            .label(question.getLabel())
            .isRequired(question.isRequired())
            .displayOrder(displayOrder)
            .category(question.getCategory())
            .build();

    List<QuestionOptionEntity> options =
        IntStream.range(0, question.getOptions().size())
            .mapToObj(
                i -> {
                  QuestionOptionEntity optionEntity =
                      QuestionOptionMapper.toEntity(question.getOptions().get(i), i);
                  optionEntity.setQuestion(questionEntity); // 연관관계 설정
                  return optionEntity;
                })
            .collect(Collectors.toCollection(ArrayList::new)); // 가변 리스트로 수집

    questionEntity.setOptions(options);
    return questionEntity;
  }
}
