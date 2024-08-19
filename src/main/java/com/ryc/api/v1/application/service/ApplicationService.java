package com.ryc.api.v1.application.service;

import com.ryc.api.v1.application.dto.request.CreateQuestionRequest;
import com.ryc.api.v1.application.dto.response.CreateQuestionResponse;

public interface ApplicationService {
    CreateQuestionResponse createQuestions(CreateQuestionRequest body);
}
