package com.ryc.api.v1.application.service;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.applicant.repository.ApplicantRepository;
import com.ryc.api.v1.application.domain.answer.Answer;
import com.ryc.api.v1.application.domain.answer.Application;
import com.ryc.api.v1.application.domain.metadata.ApplicationDefaultField;
import com.ryc.api.v1.application.domain.metadata.Field;
import com.ryc.api.v1.application.domain.question.MultipleChoiceOption;
import com.ryc.api.v1.application.domain.question.Question;
import com.ryc.api.v1.application.domain.question.QuestionType;
import com.ryc.api.v1.application.dto.internal.OptionDto;
import com.ryc.api.v1.application.dto.internal.QuestionDto;
import com.ryc.api.v1.application.dto.internal.RequiredFieldDto;
import com.ryc.api.v1.application.dto.request.CreateApplicationRequest;
import com.ryc.api.v1.application.dto.request.CreateApplicationFormRequest;
import com.ryc.api.v1.application.dto.request.UpdateAnswerAccessibilityRequest;
import com.ryc.api.v1.application.dto.response.*;
import com.ryc.api.v1.application.repository.*;
import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import com.ryc.api.v1.recruitment.repository.RecruitmentRepository;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.UserClubRole;
import com.ryc.api.v1.role.repository.UserClubRoleRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;
import com.ryc.api.v1.util.SortUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final StepRepository stepRepository;
    private final ApplicationDefaultFieldRepository applicationDefaultFieldRepository;
    private final QuestionRepository questionRepository;
    private final MultipleChoiceOptionRepository multipleChoiceOptionRepository;
    private final ApplicantRepository applicantRepository;
    private final AnswerRepository answerRepository;
    private final ApplicationRepository applicationRepository;
    private final UserClubRoleRepository userClubRoleRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CreateApplicationFormResponse createApplicationForm(CreateApplicationFormRequest body) {
        //1. 해당 전형단계 칮기
        Step step = stepRepository.findById(body.stepId())
                .orElseThrow(() -> new NoSuchElementException("Step not found"));

        //2. 해당 stepType이 APPLICATION 인지 확인
        if (step.getStepType() != StepType.APPLICATION)
            throw new IllegalArgumentException("This steptype is not APPLICATION");

        //3. 지원서 필수 필드 설정
        List<Field> requiredFields = body.requiredFields();
        for (Field field : requiredFields) {
            ApplicationDefaultField applicationDefaultField = ApplicationDefaultField.builder()
                    .step(step)
                    .field(field)
                    .isRequired(true)
                    .build();
            applicationDefaultFieldRepository.save(applicationDefaultField);
        }

        //4. 지원서 질문 생성
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
        return new CreateApplicationFormResponse(LocalDateTime.now());
    }

    @Override
    @Transactional
    public GetApplicationFormResponse getApplicationForm(String stepId) {
        // 1.지원서 이름 불러오기
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new NoSuchElementException("Step not found"));
        String stepName = step.getStepName();

        //2. 지원서 필수 응답항목 불러오기
        List<ApplicationDefaultField> applicationDefaultFields = applicationDefaultFieldRepository.findByStep(step);
        List<Field> requiredFields = new ArrayList<>();
        for (ApplicationDefaultField applicationDefaultField : applicationDefaultFields) {
            requiredFields.add(applicationDefaultField.getField());
        }

        //3. 지원서 전체 문항 불러오기
        List<QuestionDto> questionDtos = new ArrayList<>();
        List<Question> questions = step.getQuestions();
        for (Question question : questions) {
            List<OptionDto> optionDtos = getOptionDtos(question);
            QuestionDto questionDto = question.toQuestionDto(optionDtos);
            questionDtos.add(questionDto);
        }
        SortUtils.sortList(questionDtos, Comparator.comparing(QuestionDto::questionOrder));

        return new GetApplicationFormResponse(stepName, requiredFields, questionDtos);
    }

    @Override
    @Transactional
    public CreateApplicationResponse createApplication(CreateApplicationRequest body) {
        // 1. 전형에 맞는 동아리 찾기
        Step step = stepRepository.findById(body.stepId())
                .orElseThrow(() -> new NoSuchElementException("Step not found"));
        Club club = step.getRecruitment().getClub();

        //2. 지원자 생성 및 필수 정보 저장
        final Applicant applicant = Applicant.builder()
                .recruitment(step.getRecruitment())
                .club(club)
                .build();
        applicant.setRequiredFields(body.requiredFieldAnswers());

        //TODO: 지원자 생성시 clubID 어떻게 찾을지 설정
        applicantRepository.save(applicant);

        //3. 지원서 생성
        Application application = Application.builder()
                .applicant(applicant)
                .step(step)
                .build();
        applicationRepository.save(application);

        //4. 질문 응답 생성
        List<CreateApplicationRequest.QuestionAnswerDto> answers = body.answers();
        if (answers.isEmpty())
            throw new IllegalArgumentException("Answers cannot be empty");

        for (CreateApplicationRequest.QuestionAnswerDto answerDto : answers) {
            Question question = questionRepository.findById(answerDto.questionId())
                    .orElseThrow(() -> new NoSuchElementException("Question not found"));

            if (answerDto.optionAnswerId() == null && answerDto.subjectiveAnswer() == null)
                throw new IllegalArgumentException("answer should not be null");

            if (question.getQuestionType() == QuestionType.MULTIPLE_CHOICE) {
                MultipleChoiceOption multipleChoiceOption = multipleChoiceOptionRepository.findById(answerDto.optionAnswerId())
                        .orElseThrow(() -> new NoSuchElementException("option answer not found"));
                Answer answer = Answer.builder()
                        .application(application)
                        .question(question)
                        .answerByMultipleChoice(multipleChoiceOption)
                        .build();
                answerRepository.save(answer);
            } else if (question.getQuestionType() == QuestionType.SUBJECTIVE) {
                Answer answer = Answer.builder()
                        .application(application)
                        .question(question)
                        .answerBySubjective(answerDto.subjectiveAnswer())
                        .build();
                answerRepository.save(answer);
            }
        }

        return new CreateApplicationResponse(application.getCreatedAt());
    }

    @Override
    @Transactional
    public GetApplicationResponse findApplicationByApplicantId(String stepId, String applicantId) {
        //0. 해당 접근자가, 회장인지 동아리원인지 판단.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetail userDetails = (CustomUserDetail) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        Club club = stepRepository.findById(stepId)
                .orElseThrow(() -> new NoSuchElementException("Step not found"))
                .getRecruitment().getClub();

        UserClubRole userClubRole = userClubRoleRepository.findByClubAndUser(club, user)
                .orElseThrow(() -> new NoSuchElementException("User is not in Club"));


        //1. stepId(해당 전형 하위 step)와 applicantId(지원자id)로 지원서 찾기
        Applicant applicant = applicantRepository.findById(applicantId)
                .orElseThrow(() -> new NoSuchElementException("Applicant not found"));
        Step step = stepRepository.findById(stepId)
                .orElseThrow(() -> new NoSuchElementException("Step not found"));

        Application application = applicationRepository.findByApplicantAndStep(applicant, step)
                .orElseThrow(() -> new NoSuchElementException("Application not found"));

        //2-1. 회장에게만, 필수 응답값(지원자정보) DTO생성
        RequiredFieldDto requiredFieldAnswerDto = applicant.toRequiredFieldDto();

        //2-2. 질문 및 답변값 DTO 생성
        List<GetApplicationResponse.QuestionAnswerDto> questionAnswerDtos = new ArrayList<>();
        List<Answer> answers = answerRepository.findAllByApplication(application);
        if (answers.isEmpty())
            throw new IllegalArgumentException("Answers cannot be empty");

        for (Answer answer : answers) {
            Question question = questionRepository.findById(answer.getQuestion().getId())
                    .orElseThrow(() -> new NoSuchElementException("Question not found"));

            //동아리원 접근 제한 응답 확인
            if (userClubRole.getClubRole() == ClubRole.MEMBER && !question.isAccessible())
                continue;

            String answerText = getAnswerText(question, answer);
            GetApplicationResponse.QuestionAnswerDto questionAnswerDto = GetApplicationResponse.QuestionAnswerDto.builder()
                    .questionId(question.getId())
                    .questionOrder(question.getQuestionOrder())
                    .questionText(question.getQuestionText())
                    .questionType(question.getQuestionType())
                    .answer(answerText)
                    .build();

            questionAnswerDtos.add(questionAnswerDto);
        }
        //2-1. 질문 순서에 맞게 정렬
        SortUtils.sortList(questionAnswerDtos, Comparator.comparing(GetApplicationResponse.QuestionAnswerDto::questionOrder));

        //3. 전체 지원서 반환값 생성
        return GetApplicationResponse.builder()
                .applicantId(applicant.getId())
                .requiredFieldAnswerDto(userClubRole.getClubRole() == ClubRole.PRESIDENT ? requiredFieldAnswerDto : null)
                .questionAnswerDtos(questionAnswerDtos)
                .build();
    }

    @Override
    @Transactional
    public UpdateAnswerAccessibilityResponse updateAnswerAccessibility(String questionId, UpdateAnswerAccessibilityRequest body) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question not found"));
        question.updateQuestion(body);
        questionRepository.flush();
        return new UpdateAnswerAccessibilityResponse(question.getUpdatedAt());
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

    private String getAnswerText(Question question, Answer answer) {
        if (question.getQuestionType() == QuestionType.MULTIPLE_CHOICE) {
            return answer.getAnswerByMultipleChoice().getOptionText();
        }
        return answer.getAnswerBySubjective();
    }
}
