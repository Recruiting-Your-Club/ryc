package com.ryc.api.v1.application.controller;

import com.ryc.api.v1.application.dto.request.CreateQuestionRequest;
import com.ryc.api.v1.application.dto.response.CreateQuestionResponse;
import com.ryc.api.v1.application.service.ApplicationService;
import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/application")
@RequiredArgsConstructor
@Tag(name = "지원서")
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody CreateQuestionRequest body) {
        try {
            CreateQuestionResponse response = applicationService.createQuestions(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
