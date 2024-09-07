package com.ryc.api.v1.interview.controller;

import com.ryc.api.v1.interview.dto.request.CreateInterviewRequest;
import com.ryc.api.v1.interview.dto.response.CreateInterviewResponse;
import com.ryc.api.v1.interview.service.InterviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
