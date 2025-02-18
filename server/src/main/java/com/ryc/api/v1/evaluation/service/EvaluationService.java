package com.ryc.api.v1.evaluation.service;

import java.util.List;

import com.ryc.api.v1.evaluation.dto.request.CreateEvaluationRequest;
import com.ryc.api.v1.evaluation.dto.response.CreateEvaluationResponse;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationResponse;

public interface EvaluationService {
  CreateEvaluationResponse createEvaluation(CreateEvaluationRequest body);

  List<GetEvaluationResponse> getEvaluations(String stepId, List<String> applicantIdList);
}
