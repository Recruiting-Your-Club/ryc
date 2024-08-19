package com.ryc.api.v1.application.service;

import com.ryc.api.v1.application.domain.MultipleChoiceOption;
import com.ryc.api.v1.application.domain.Question;
import com.ryc.api.v1.application.domain.QuestionType;
import com.ryc.api.v1.application.dto.internal.OptionDto;
import com.ryc.api.v1.application.dto.internal.QuestionDto;
import com.ryc.api.v1.application.dto.request.CreateQuestionRequest;
import com.ryc.api.v1.application.dto.response.CreateQuestionResponse;
import com.ryc.api.v1.application.repository.MultipleChoiceOptionRepository;
import com.ryc.api.v1.application.repository.QuestionRepository;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final StepRepository stepRepository;
    private final QuestionRepository questionRepository;
    private final MultipleChoiceOptionRepository multipleChoiceOptionRepository;

    @Override
    @Transactional
    public CreateQuestionResponse createQuestions(CreateQuestionRequest body) {
        Step step = stepRepository.findById(body.stepId())
                .orElseThrow(() -> new NoSuchElementException("Step not found"));

        //해당 stepType이 APPLICATION 인지 확인
        if(step.getStepType() != StepType.APPLICATION)
            throw new IllegalArgumentException("This steptype is not APPLICATION");

        List<QuestionDto> questions = body.questions();
        for (QuestionDto questionDto : questions) {
            //질문 데이터 저장
            Question question = questionDto.toQuestion(step);
            questionRepository.save(question);

            //객관식 선지 저장
            if (questionDto.questionType() == QuestionType.MULTIPLE_CHOICE) {
                saveMultiChoiceQuestionOption(questionDto.options(),question);
            }
        }

        // TODO: 생성시간 반영하여 응답 수정하기
        return new CreateQuestionResponse(LocalDateTime.now());
    }

    private void saveMultiChoiceQuestionOption(List<OptionDto> options, Question question) {
        for (OptionDto optionDto : options) {
            MultipleChoiceOption multipleChoiceOption = optionDto.toMultipleChoiceOption(question);
            multipleChoiceOptionRepository.save(multipleChoiceOption);
        }
    }
}
