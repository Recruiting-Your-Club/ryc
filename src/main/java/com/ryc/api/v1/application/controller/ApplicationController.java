package com.ryc.api.v1.application.controller;

import com.ryc.api.v1.application.dto.request.CreateApplicationRequest;
import com.ryc.api.v1.application.dto.request.CreateApplicationFormRequest;
import com.ryc.api.v1.application.dto.request.UpdateAnswerAccessibilityRequest;
import com.ryc.api.v1.application.dto.response.*;
import com.ryc.api.v1.application.service.ApplicationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/application")
@RequiredArgsConstructor
@Tag(name = "지원서")
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping("/form")
    public ResponseEntity<?> createApplicationForm(@Valid @RequestBody CreateApplicationFormRequest body) {
        try {
            CreateApplicationFormResponse response = applicationService.createApplicationForm(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/form")
    public ResponseEntity<?> getApplicationForm(@RequestParam(required = true) String stepId) {
        try {
            GetApplicationFormResponse response = applicationService.getApplicationForm(stepId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createApplication(@Valid @RequestBody CreateApplicationRequest body) {
        try {
            CreateApplicationResponse response = applicationService.createApplication(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getApplication(@RequestParam(required = true) String stepId,
                                            @RequestParam(required = true) List<String> applicantIdList) {
        try {
            List<GetApplicationResponse> response = applicationService.findApplicationByApplicantId(stepId, applicantIdList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PatchMapping("/questions/{questionId}")
    public ResponseEntity<?> updateAnswerAccessibility(@PathVariable String questionId,
                                                       @RequestBody @Valid UpdateAnswerAccessibilityRequest body) {
        try {
            UpdateAnswerAccessibilityResponse response = applicationService.updateAnswerAccessibility(questionId,body);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
