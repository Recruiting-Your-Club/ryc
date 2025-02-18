package com.ryc.api.v1.application.service;

import java.util.List;

import com.ryc.api.v1.application.dto.request.CreateApplicationFormRequest;
import com.ryc.api.v1.application.dto.request.CreateApplicationRequest;
import com.ryc.api.v1.application.dto.request.UpdateAnswerAccessibilityRequest;
import com.ryc.api.v1.application.dto.response.*;

public interface ApplicationService {
  CreateApplicationFormResponse createApplicationForm(CreateApplicationFormRequest body);

  GetApplicationFormResponse getApplicationForm(String stepId);

  CreateApplicationResponse createApplication(CreateApplicationRequest body);

  List<GetApplicationResponse> findApplicationByApplicantId(
      String stepId, List<String> applicantId);

  UpdateAnswerAccessibilityResponse updateAnswerAccessibility(
      String questionId, UpdateAnswerAccessibilityRequest body);
}
