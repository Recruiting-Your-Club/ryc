package com.ryc.api.v1.evaluation.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v1.common.aop.annotation.HasAnyRoleSecured;
import com.ryc.api.v1.evaluation.dto.request.CreateEvaluationRequest;
import com.ryc.api.v1.evaluation.dto.response.CreateEvaluationResponse;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationResponse;
import com.ryc.api.v1.evaluation.service.EvaluationService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/evaluation/")
@RequiredArgsConstructor
@Tag(name = "평가하기")
public class EvaluationController {
  private final EvaluationService evaluationService;

  @HasAnyRoleSecured
  @PostMapping("/")
  public ResponseEntity<?> createEvaluation(@Valid @RequestBody CreateEvaluationRequest body) {
    try {
      CreateEvaluationResponse response = evaluationService.createEvaluation(body);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
  }

  @HasAnyRoleSecured
  @GetMapping
  public ResponseEntity<?> getEvaluations(
      @NotEmpty @RequestParam String clubId,
      @NotEmpty @RequestParam String stepId,
      @RequestParam(required = false) List<String> applicantIdList) {
    try {
      List<GetEvaluationResponse> response =
          evaluationService.getEvaluations(stepId, applicantIdList);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
  }
}
