package com.ryc.api.v2.announcement.infra.mapper;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;

@Component
public class ApplicationQuestionMapper {

  /** VO to Domain */
  public ApplicationQuestion toDomain(ApplicationQuestionVO question) {

    return ApplicationQuestion.builder()
        .type(question.getQuestionType())
        .label(question.getLabel())
        .isRequired(question.isRequired())
        .options(question.getOptions())
        .build();
  }

  /** Domain to VO */
  public ApplicationQuestionVO toVO(ApplicationQuestion questionVO) {

    return ApplicationQuestionVO.builder()
        .questionType(questionVO.type())
        .label(questionVO.label())
        .isRequired(questionVO.isRequired())
        .options(questionVO.options())
        .build();
  }
}
