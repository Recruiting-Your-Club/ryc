package com.ryc.api.v2.applicant.presentation;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantStatusRequest;
import com.ryc.api.v2.applicant.service.ApplicantService;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v2/applicants")
@Tag(name = "지원자")
public class ApplicantHttpApi {

  private final ApplicantService applicantService;

  @PostMapping("/{id}")
  @Operation(summary = "지원자 상태 변경")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND", "INVALID_PARAMETER"})
  public ResponseEntity<Void> changeApplicantStatus(
      @PathVariable String id, @Valid @RequestBody ApplicantStatusRequest statusRequest) {
    applicantService.changeApplicantStatus(id, statusRequest);
    return ResponseEntity.ok().build();
  }
}
