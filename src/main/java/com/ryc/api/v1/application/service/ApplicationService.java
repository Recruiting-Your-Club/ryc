package com.ryc.api.v1.application.service;

import com.ryc.api.v1.application.dto.request.CreateApplicationRequest;
import com.ryc.api.v1.application.dto.request.CreateQuestionRequest;
import com.ryc.api.v1.application.dto.request.UpdateAnswerAccessibilityRequest;
import com.ryc.api.v1.application.dto.response.*;

public interface ApplicationService {
    CreateQuestionResponse createQuestions(CreateQuestionRequest body);
    GetQuestionResponse getQuestions(String stepId);
    CreateApplicationResponse createApplication(CreateApplicationRequest body);

    GetApplicationResponse findApplicationByApplicantId(String stepId, String applicantId);
    UpdateAnswerAccessibilityResponse updateAnswerAccessibility(String questionId, UpdateAnswerAccessibilityRequest body);
}
