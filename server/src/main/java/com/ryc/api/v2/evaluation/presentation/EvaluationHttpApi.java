package com.ryc.api.v2.evaluation.presentation;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.presentation.dto.request.*;
import com.ryc.api.v2.evaluation.presentation.dto.response.*;
import com.ryc.api.v2.evaluation.service.EvaluationService;
import com.ryc.api.v2.role.domain.enums.Role;
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

  @HasRole(Role.MEMBER)
  @PostMapping("/application")
  @Operation(summary = "지원서 평가 생성 API")
  // TODO: Evaluation 객체에 validate 메서드가 활성화 된다면, 그에 맞는 예외 응답 코드 추가 필요
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<ApplicationEvaluationResponse> evaluateApplication(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody ApplicationEvaluationRequest body) {
    ApplicationEvaluationResponse response =
        evaluationService.evaluateApplication(body, userDetail.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @HasRole(Role.MEMBER)
  @PostMapping("/interview")
  @Operation(summary = "면접 평가 생성 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<InterviewEvaluationResponse> evaluateInterview(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody InterviewEvaluationRequest body) {
    InterviewEvaluationResponse response =
        evaluationService.evaluateInterview(body, userDetail.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @HasRole(Role.MEMBER)
  @PostMapping("/applications/search")
  @Operation(summary = "지원자의 지원서 평가 리스트 검색 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<EvaluationSearchResponse> getApplicationEvaluations(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody EvaluationSearchRequest body) {
    EvaluationSearchResponse response =
        evaluationService.findAllEvaluations(body, userDetail.getId(), EvaluationType.APPLICATION);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @PostMapping("/interviews/search")
  @Operation(summary = "지원자의 면접 평가 리스트 검색 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<EvaluationSearchResponse> getInterviewEvaluations(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody EvaluationSearchRequest body) {
    EvaluationSearchResponse response =
        evaluationService.findAllEvaluations(body, userDetail.getId(), EvaluationType.INTERVIEW);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @GetMapping("/applications/my-status")
  @Operation(summary = "지원자들에 대해, 해당 로그인한 평가자의 지원서 평가 수행 여부 조회 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<MyEvaluationStatusSearchResponse>
      getMyApplicationEvaluationStatusForApplicants(
          @RequestParam String announcementId,
          @AuthenticationPrincipal CustomUserDetail userDetail) {
    MyEvaluationStatusSearchResponse response =
        evaluationService.findMyEvaluationStatusForApplicants(
            userDetail.getId(), announcementId, EvaluationType.APPLICATION);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @GetMapping("/interviews/my-status")
  @Operation(summary = "지원자들에 대해, 해당 로그인한 평가자의 면접 평가 수행 여부 조회 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<MyEvaluationStatusSearchResponse>
      getMyInterviewEvaluationStatusForApplicants(
          @RequestParam String announcementId,
          @AuthenticationPrincipal CustomUserDetail userDetail) {
    MyEvaluationStatusSearchResponse response =
        evaluationService.findMyEvaluationStatusForApplicants(
            userDetail.getId(), announcementId, EvaluationType.INTERVIEW);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @PostMapping("/applications/summary")
  @Operation(summary = "지원자들의 지원서에 대해 현재까지 완료된 평가 수 및 평균 점수를 조회하는 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<EvaluationOverviewSearchResponse> getApplicationEvaluationOverviews(
      @Valid @RequestBody EvaluationSearchRequest body) {
    EvaluationOverviewSearchResponse response =
        evaluationService.findAllEvaluationOverviews(body, EvaluationType.APPLICATION);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @PostMapping("/interviews/summary")
  @Operation(summary = "지원자들의 면접에 대해 현재까지 완료된 평가 수 및 평균 점수를 조회하는 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<EvaluationOverviewSearchResponse> getInterviewEvaluationOverviews(
      @Valid @RequestBody EvaluationSearchRequest body) {
    EvaluationOverviewSearchResponse response =
        evaluationService.findAllEvaluationOverviews(body, EvaluationType.INTERVIEW);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @PutMapping("/{evaluation-id}")
  @Operation(summary = "평가 수정 API")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<EvaluationUpdateResponse> updateEvaluation(
      @PathVariable("evaluation-id") String evaluationId,
      @Valid @RequestBody EvaluationUpdateRequest body) {
    EvaluationUpdateResponse response = evaluationService.updateEvaluation(body, evaluationId);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasRole(Role.MEMBER)
  @DeleteMapping("/{evaluation-id}")
  @Operation(summary = "평가 삭제 API")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<Void> deleteEvaluation(@PathVariable("evaluation-id") String evaluationId) {
    evaluationService.deleteEvaluation(evaluationId);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
