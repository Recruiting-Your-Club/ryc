package com.ryc.api.v1.evaluation.controller;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.dto.request.CreateEvaluationRequest;
import com.ryc.api.v1.evaluation.dto.request.CreatePermissionApplicationRequest;
import com.ryc.api.v1.evaluation.dto.response.CreateEvaluationResponse;
import com.ryc.api.v1.evaluation.dto.response.CreatePermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationResponse;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.evaluation.service.EvaluationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/evaluation/")
@RequiredArgsConstructor
@Tag(name = "평가하기")
public class EvaluationController {
    private final EvaluationService evaluationService;

    @PostMapping("/")
    public ResponseEntity<?> createEvaluation(@Valid @RequestBody CreateEvaluationRequest body) {
        try {
            CreateEvaluationResponse response = evaluationService.createEvaluation(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getEvaluations(@NotEmpty @RequestParam String stepId,
                                            @RequestParam(required = false) String applicantId) {
        try {
            List<GetEvaluationResponse> response = evaluationService.getEvaluations(stepId, applicantId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
