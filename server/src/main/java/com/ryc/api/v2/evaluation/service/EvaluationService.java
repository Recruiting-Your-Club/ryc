package com.ryc.api.v2.evaluation.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.evaluation.domain.Evaluation;
import com.ryc.api.v2.evaluation.domain.EvaluationRepository;
import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.presentation.dto.request.ApplicationEvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.request.InterviewEvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.response.ApplicationEvaluationResponse;
import com.ryc.api.v2.evaluation.presentation.dto.response.InterviewEvaluationResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EvaluationService {
  private final EvaluationRepository evaluationRepository;

  @Transactional
  public ApplicationEvaluationResponse evaluateApplication(
      ApplicationEvaluationRequest body, String adminId) {
    Evaluation evaluation = Evaluation.initialize(body, EvaluationType.APPLICATION, adminId);
    Evaluation savedEvaluation = evaluationRepository.save(evaluation);

    return ApplicationEvaluationResponse.builder()
        .score(savedEvaluation.getScore())
        .comment(savedEvaluation.getComment())
        .build();
  }

  @Transactional
  public InterviewEvaluationResponse evaluateInterview(
      InterviewEvaluationRequest body, String adminId) {
    Evaluation evaluation = Evaluation.initialize(body, EvaluationType.INTERVIEW, adminId);
    Evaluation savedEvaluation = evaluationRepository.save(evaluation);

    return InterviewEvaluationResponse.builder()
        .score(savedEvaluation.getScore())
        .comment(savedEvaluation.getComment())
        .build();
  }
}
