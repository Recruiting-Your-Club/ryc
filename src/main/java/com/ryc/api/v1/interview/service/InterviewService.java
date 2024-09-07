package com.ryc.api.v1.interview.service;

import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;

public interface InterviewService {
    CreateInterviewResponse createInterview(CreateInterviewRequest body);
}
