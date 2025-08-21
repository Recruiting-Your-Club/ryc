package com.ryc.api.v2.applicant.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

public record ApplicantDeletedRequest(
    @NotNull(message = "지원자 id 리스트는 null일 수 없습니다.")
        List<@NotBlank(message = "지원자 id는 빈칸일 수 없습니다.") String> applicantIds) {

  @Override
  @Schema(description = "지원자 id 리스트")
  public List<String> applicantIds() {
    return List.copyOf(applicantIds);
  }
}
