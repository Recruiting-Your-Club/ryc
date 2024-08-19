package com.ryc.api.v1.application.service;

import com.ryc.api.v1.application.domain.MultipleChoiceOption;
import com.ryc.api.v1.application.domain.Question;
import com.ryc.api.v1.application.domain.QuestionType;
import com.ryc.api.v1.application.dto.internal.OptionDto;
import com.ryc.api.v1.application.dto.internal.QuestionDto;
import com.ryc.api.v1.application.dto.request.CreateQuestionRequest;
import com.ryc.api.v1.application.dto.response.CreateQuestionResponse;
import com.ryc.api.v1.application.dto.response.GetQuestionResponse;
import com.ryc.api.v1.application.repository.MultipleChoiceOptionRepository;
import com.ryc.api.v1.application.repository.QuestionRepository;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import com.ryc.api.v1.util.SortUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

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
        if (step.getStepType() != StepType.APPLICATION)
            throw new IllegalArgumentException("This steptype is not APPLICATION");

        List<QuestionDto> questions = body.questions();
        for (QuestionDto questionDto : questions) {
            //질문 데이터 저장
            Question question = questionDto.toQuestion(step);
            questionRepository.save(question);

            //객관식 선지 저장
            if (questionDto.questionType() == QuestionType.MULTIPLE_CHOICE) {
                saveMultiChoiceQuestionOption(questionDto.options(), question);
            }
        }

        // TODO: 생성시간 반영하여 응답 수정하기
        return new CreateQuestionResponse(LocalDateTime.now());
    }

    @Override
    @Transactional
    public GetQuestionResponse getQuestions(String stepId) {
        // 1.지원서 이름 불러오기
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new NoSuchElementException("Step not found"));
        String stepName = step.getStepName();

        //2. 지원서 전체 문항 불러오기
        List<QuestionDto> questionDtos = new ArrayList<>();
        List<Question> questions = step.getQuestions();
        for (Question question : questions) {
            List<OptionDto> optionDtos = getOptionDtos(question);
            QuestionDto questionDto = question.toQuestionDto(optionDtos);
            questionDtos.add(questionDto);
        }
        SortUtils.sortList(questionDtos, Comparator.comparing(QuestionDto::questionOrder));

        return new GetQuestionResponse(stepName, questionDtos);
    }

    private void saveMultiChoiceQuestionOption(List<OptionDto> options, Question question) {
        for (OptionDto optionDto : options) {
            MultipleChoiceOption multipleChoiceOption = optionDto.toMultipleChoiceOption(question);
            multipleChoiceOptionRepository.save(multipleChoiceOption);
        }
    }

    private List<OptionDto> getOptionDtos(Question question) {
        List<OptionDto> optionDtos = new ArrayList<>();
        if (question.getQuestionType() == QuestionType.MULTIPLE_CHOICE) {
            List<MultipleChoiceOption> multipleChoiceOptions = question.getMultipleChoiceOptions();
            for (MultipleChoiceOption multipleChoiceOption : multipleChoiceOptions) {
                optionDtos.add(multipleChoiceOption.toOptionDto());
            }
        }

        SortUtils.sortList(optionDtos, Comparator.comparing(OptionDto::optionOrder));
        return optionDtos;
    }
}
