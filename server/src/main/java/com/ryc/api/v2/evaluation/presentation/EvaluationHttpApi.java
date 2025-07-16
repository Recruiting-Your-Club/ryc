package com.ryc.api.v2.evaluation.presentation;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.presentation.dto.request.ApplicationEvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.request.EvaluationSearchRequest;
import com.ryc.api.v2.evaluation.presentation.dto.request.InterviewEvaluationRequest;
import com.ryc.api.v2.evaluation.presentation.dto.response.ApplicationEvaluationResponse;
import com.ryc.api.v2.evaluation.presentation.dto.response.EvaluationSearchResponse;
import com.ryc.api.v2.evaluation.presentation.dto.response.InterviewEvaluationResponse;
import com.ryc.api.v2.evaluation.service.EvaluationService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/evaluation")
@RequiredArgsConstructor
@Tag(name = "평가")
public class EvaluationHttpApi {
  private final EvaluationService evaluationService;

  // TODO: 동아리원 검증 AOP 수행 - AOP 구현이후 어노테이션 추가, Header에서 받은 clubId를 ClubRoleAspect로 넘긴다.
  @PostMapping("/application")
  @Operation(summary = "지원서 평가 생성 API")
  public ResponseEntity<ApplicationEvaluationResponse> evaluateApplication(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody ApplicationEvaluationRequest body) {
    ApplicationEvaluationResponse response =
        evaluationService.evaluateApplication(body, userDetail.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  // TODO: 동아리원 검증 AOP 수행
  @PostMapping("/interview")
  @Operation(summary = "면접 평가 생성 API")
  public ResponseEntity<InterviewEvaluationResponse> evaluateInterview(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody InterviewEvaluationRequest body) {
    InterviewEvaluationResponse response =
        evaluationService.evaluateInterview(body, userDetail.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  // TODO: 동아리원 검증 AOP 수행
  @PostMapping("/applicaitons/search")
  @Operation(summary = "지원자의 지원서 평가 리스트 검색 API")
  public ResponseEntity<EvaluationSearchResponse> getApplicationEvaluations(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody EvaluationSearchRequest body) {
    EvaluationSearchResponse response =
        evaluationService.findAllEvaluations(body, userDetail.getId(), EvaluationType.APPLICATION);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  // TODO: 동아리원 검증 AOP 수행
  @PostMapping("/interviews/search")
  @Operation(summary = "지원자의 면접 평가 리스트 검색 API")
  public ResponseEntity<EvaluationSearchResponse> getInterviewEvaluations(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody EvaluationSearchRequest body) {
    EvaluationSearchResponse response =
        evaluationService.findAllEvaluations(body, userDetail.getId(), EvaluationType.INTERVIEW);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }


}
