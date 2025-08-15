package com.ryc.api.v2.applicant.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantStatusRequest;
import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantGetResponse;
import com.ryc.api.v2.applicant.service.ApplicantService;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v2")
@Tag(name = "지원자")
public class ApplicantHttpApi {

  private final ApplicantService applicantService;

  @PatchMapping("/applicants/{id}/status")
  @HasRole(Role.MEMBER)
  @Operation(summary = "지원자 상태 변경")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"RESOURCE_NOT_FOUND", "INVALID_PARAMETER", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<Void> changeApplicantStatus(
      @PathVariable String id, @Valid @RequestBody ApplicantStatusRequest statusRequest) {
    applicantService.changeApplicantStatus(id, statusRequest);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("announcements/{announcement-id}/applicants")
  @HasRole(Role.MEMBER)
  @Operation(summary = "공고 지원자 목록 조회")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, PermissionErrorCode.class},
      include = {"RESOURCE_NOT_FOUND", "INVALID_PARAMETER", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<ApplicantGetResponse>> getApplicants(
      @PathVariable("announcement-id") String announcementId,
      @RequestParam(value = "status", required = false)
          @Schema(
              allowableValues = {
                "DOCUMENT_PENDING",
                "DOCUMENT_FAIL",
                "INTERVIEW_PENDING",
                "INTERVIEW_FAIL",
                "FINAL_PASS",
                "FINAL_FAIL",
              })
          String status) {
    List<ApplicantGetResponse> response = applicantService.getApplicants(announcementId, status);
    return ResponseEntity.ok(response);
  }
}
