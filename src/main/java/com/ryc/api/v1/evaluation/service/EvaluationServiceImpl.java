package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.applicant.repository.ApplicantRepository;
import com.ryc.api.v1.evaluation.domain.Evaluation;
import com.ryc.api.v1.evaluation.dto.request.CreateEvaluationRequest;
import com.ryc.api.v1.evaluation.dto.response.CreateEvaluationResponse;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationResponse;
import com.ryc.api.v1.evaluation.repository.EvaluationRepository;
import com.ryc.api.v1.evaluation.repository.PermissionRepository;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.repository.RecruitmentRepository;
import com.ryc.api.v1.recruitment.repository.StepRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {

    private final RecruitmentRepository recruitmentRepository;
    private final StepRepository stepRepository;
    private final ApplicantRepository applicantRepository;
    private final UserRepository userRepository;
    private final PermissionRepository permissionRepository;
    private final EvaluationRepository evaluationRepository;

    @Override
    @Transactional
    public CreateEvaluationResponse createEvaluation(CreateEvaluationRequest body) {
        Recruitment recruitment = recruitmentRepository.findById(body.recruitmentId())
                .orElseThrow(() -> new NoSuchElementException("recruitment not found"));

        Step step = stepRepository.findById(body.stepId())
                .orElseThrow(() -> new NoSuchElementException("step not found"));

        //0. applicant_id가 해당 전형 소속인지 검사
        Applicant applicant = applicantRepository.findById(body.applicantId())
                .orElseThrow(() -> new NoSuchElementException("applicant not found"));
        if(!applicant.getRecruitment().equals(recruitment))
            throw new IllegalStateException("The applicant does not belong to the recruitment process.");

        //1. 평가자 정보 불러오기
        CustomUserDetail userDetails = (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userDetails.getId();
        User reviewUser = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        //2. 평가자 권한 확인하기
        if(!permissionRepository.existsByUserAndRecruitment(reviewUser, recruitment))
            throw new IllegalStateException("Permission not found.");

        //3. 평가 생성하기
        Evaluation evaluation = Evaluation.builder()
                .recruitment(recruitment)
                .step(step)
                .applicant(applicant)
                .score(body.score())
                .comment(body.comment())
                .reviewedBy(reviewUser)
                .build();

        try {
            evaluationRepository.save(evaluation);
            evaluationRepository.flush();
        } catch (DataIntegrityViolationException e) {
            // 중복 키 제약 조건 위반 시, 사용자 정의 예외 던지기
            throw new DuplicateKeyException("Duplicate entry detected: The step, applicant, reviewedBy combination already exists.");
        }

        return new CreateEvaluationResponse(evaluation.getCreatedAt());
    }

    @Override
    @Transactional
    public List<GetEvaluationResponse> getEvaluations(String stepId, String applicantId) {
        List<Evaluation> evaluations = new ArrayList<>();

        if(applicantId == null)
            evaluations = evaluationRepository.findByStepId(stepId);
        else
            evaluations = evaluationRepository.findByStepIdAndApplicantId(stepId,applicantId);

        List<GetEvaluationResponse> responses = new ArrayList<>();
        for(Evaluation evaluation : evaluations){
            GetEvaluationResponse getEvaluationResponse = evaluation.toGetEvaluationResponse();
            responses.add(getEvaluationResponse);
        }

        return responses;
    }
}
