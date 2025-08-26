package com.ryc.api.v2.applicant.presentation;

import java.util.List;

import jakarta.validation.Valid;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantDeletedRequest;
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
@Validated
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
          @PathVariable @NotBlank @UUID String id,
          @Valid @RequestBody ApplicantStatusRequest statusRequest) {
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
      @PathVariable("announcement-id") @NotBlank @UUID String announcementId,
      @Schema(
              allowableValues = {
                      "DOCUMENT_PENDING",
                      "DOCUMENT_FAIL",
                      "INTERVIEW_PENDING",
                      "INTERVIEW_FAIL",
                      "FINAL_PASS",
                      "FINAL_FAIL",
              })
      @RequestParam(value = "status", required = false) @NotBlank String status) {
    List<ApplicantGetResponse> response = applicantService.getApplicants(announcementId, status);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/applicants")
  @HasRole(Role.OWNER)
  @Operation(summary = "지원자 삭제", description = "지원자들을 삭제합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_OWNER"})
  public ResponseEntity<Void> deleteApplicants(@RequestBody ApplicantDeletedRequest request) {
    applicantService.deleteApplicants(request.applicantIds());
    return ResponseEntity.noContent().build();
  }
}
