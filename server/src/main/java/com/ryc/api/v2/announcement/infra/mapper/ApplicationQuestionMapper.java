package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.infra.vo.ApplicationQuestionVO;
import org.springframework.stereotype.Component;

@Component
public class ApplicationQuestionMapper {

    public ApplicationQuestion toDomain(ApplicationQuestionVO question) {

        return ApplicationQuestion.builder()
                .type(question.getQuestionType())
                .label(question.getLabel())
                .isRequired(question.isRequired())
                .order(question.getOrder())
                .options(question.getOptions())
                .build();
    }

    public ApplicationQuestionVO toVO(ApplicationQuestion questionVO) {

        return ApplicationQuestionVO.builder()
                .questionType(questionVO.getType())
                .label(questionVO.getLabel())
                .isRequired(questionVO.isRequired())
                .order(questionVO.getOrder())
                .options(questionVO.getOptions())
                .build();
    }

}