package com.ryc.api.v1.interview.service;

import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;

import java.util.List;

public interface InterviewService {
    List<CreateInterviewResponse> createInterview(CreateInterviewRequest body);
}
