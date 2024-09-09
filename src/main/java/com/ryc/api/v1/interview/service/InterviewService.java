package com.ryc.api.v1.interview.service;

import com.ryc.api.v1.interview.dto.request.CreateInterviewAssignmentRequest;
import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewAssignmentResponse;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;
import com.ryc.api.v1.interview.dto.response.GetAllApplicantByInterviewResponse;
import com.ryc.api.v1.interview.dto.response.GetInterviewScheduleResponse;

import java.util.List;

public interface InterviewService {
    List<CreateInterviewResponse> createInterview(CreateInterviewRequest body);
    CreateInterviewAssignmentResponse createInterviewAssignment(CreateInterviewAssignmentRequest body);

    List<GetInterviewScheduleResponse> findInterviewSchedules(String stepId);

    GetAllApplicantByInterviewResponse getAllApplicantsByInterview(String interviewId, String stepId);
}
