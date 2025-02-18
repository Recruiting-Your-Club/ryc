package com.ryc.api.v1.interview.dto.request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

import lombok.Builder;

@Builder
public record CreateInterviewRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "stepId shouldn't be empty") String stepId,
    @NotEmpty(message = "interviewSchedules shouldn't be empty")
        List<InterviewScheduleDto> interviewSchedules) {

  @Builder
  public record InterviewScheduleDto(
      @NotEmpty(message = "interviewDate shouldn't be empty") LocalDate interviewDate,
      @NotEmpty(message = "timeNumber shouldn't be empty") int timeCount) {}
}
