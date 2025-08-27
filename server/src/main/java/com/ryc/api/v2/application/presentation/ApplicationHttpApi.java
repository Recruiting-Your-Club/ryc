package com.ryc.api.v2.application.presentation;

import java.net.URI;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationGetResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.application.service.ApplicationService;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/announcements/{announcement-id}/applications")
@Validated
@Tag(name = "지원서")
public class ApplicationHttpApi {
  private final ApplicationService applicationService;

  @PostMapping
  @Operation(summary = "공고 지원", operationId = "submitApplication")
  @ApiErrorCodeExample(
      value = {ApplicationCreateErrorCode.class, CommonErrorCode.class},
      include = {
        "MISSING_REQUIRED_PERSONAL_INFO_ANSWER",
        "MISSING_REQUIRED_ANSWER",
        "DUPLICATE_PERSONAL_INFO_ANSWER",
        "INVALID_QUESTION_ID",
        "INVALID_ANSWER_FORMAT",
        "ANNOUNCEMENT_NOT_RECRUITING",
        "DUPLICATE_APPLICATION",
        "INVALID_PARAMETER",
        "RESOURCE_NOT_FOUND"
      })
  public ResponseEntity<ApplicationSubmissionResponse> submitApplication(
      @PathVariable("announcement-id")
          @NotBlank(message = "공고 아이디는 공백일 수 없습니다.")
          @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.")
          String announcementId,
      @Valid @RequestBody ApplicationSubmissionRequest body) {
    ApplicationSubmissionResponse response =
        applicationService.submitApplication(body, announcementId);

    URI location =
        URI.create(
            String.format(
                "/api/v2/announcements/%s/applications/%s",
                announcementId, response.applicationId()));
    return ResponseEntity.created(location).body(response);
  }

  @GetMapping("/{applicant-id}")
  @HasRole(Role.MEMBER)
  @Operation(summary = "지원서 상세 조회", operationId = "getApplicationDetail")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<ApplicationGetResponse> getApplicationDetail(
      @PathVariable("announcement-id")
          @NotBlank(message = "공고 아이디는 공백일 수 없습니다.")
          @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.")
          String announcementId,
      @PathVariable("applicant-id")
          @NotBlank(message = "지원자 아이디는 공백일 수 없습니다.")
          @UUID(message = "지원자 아이디는 UUID 포멧이어야 합니다.")
          String applicantId) {
    ApplicationGetResponse response =
        applicationService.getApplicationDetail(announcementId, applicantId);
    return ResponseEntity.ok(response);
  }
}
