package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.evaluation.dto.request.CreateEvaluationRequest;
import com.ryc.api.v1.evaluation.dto.response.CreateEvaluationResponse;

public interface EvaluationService {
    CreateEvaluationResponse createEvaluation(CreateEvaluationRequest body);
}
