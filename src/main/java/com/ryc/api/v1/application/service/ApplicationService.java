package com.ryc.api.v1.application.service;

import com.ryc.api.v1.application.dto.request.CreateQuestionRequest;
import com.ryc.api.v1.application.dto.response.CreateQuestionResponse;
import com.ryc.api.v1.application.dto.response.GetQuestionResponse;

public interface ApplicationService {
    CreateQuestionResponse createQuestions(CreateQuestionRequest body);
    GetQuestionResponse getQuestions(String stepId);
}
