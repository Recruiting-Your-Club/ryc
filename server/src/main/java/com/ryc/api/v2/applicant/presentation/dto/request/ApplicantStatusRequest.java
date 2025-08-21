package com.ryc.api.v2.applicant.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record ApplicantStatusRequest(
    @NotBlank(message = "변경하려는 상태 데이터는 필수입니다.")
        @Schema(
            description = "변경하려는 지원자 상태 데이터",
            allowableValues = {
              "DOCUMENT_PENDING",
              "DOCUMENT_FAIL",
              "INTERVIEW_PENDING",
              "INTERVIEW_FAIL",
              "FINAL_PASS",
              "FINAL_FAIL"
            })
        String status) {}
