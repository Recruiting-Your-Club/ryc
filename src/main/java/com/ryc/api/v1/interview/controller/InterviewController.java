package com.ryc.api.v1.interview.controller;

import com.ryc.api.v1.applicant.dto.response.GetAllApplicantResponse;
import com.ryc.api.v1.interview.dto.request.CreateInterviewAssignmentRequest;
import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewAssignmentResponse;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;
import com.ryc.api.v1.interview.dto.response.GetAllApplicantByInterviewResponse;
import com.ryc.api.v1.interview.dto.response.GetInterviewScheduleResponse;
import com.ryc.api.v1.interview.service.InterviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/interview")
@RequiredArgsConstructor
@Tag(name = "면접 관리")
public class InterviewController {
    private final InterviewService interviewService;

    @PostMapping("/")
    public ResponseEntity<?> createInterview(@Valid @RequestBody CreateInterviewRequest body) {
        try {
            List<CreateInterviewResponse> response = interviewService.createInterview(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getInterviewScheduleList(
            @NotEmpty @RequestParam String stepId) {
        try {
            List<GetInterviewScheduleResponse> response = interviewService.findInterviewSchedules(stepId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        }
    }

    @PostMapping("/assignment")
    public ResponseEntity<?> createInterviewAssignment(@Valid @RequestBody CreateInterviewAssignmentRequest body) {
        try {
            CreateInterviewAssignmentResponse response = interviewService.createInterviewAssignment(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/applicants")
    public ResponseEntity<?> getAllApplicantsByInterview(@RequestParam(required = true) String interviewId) {
        try {
            GetAllApplicantByInterviewResponse response = interviewService.getAllApplicantsByInterview(interviewId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
