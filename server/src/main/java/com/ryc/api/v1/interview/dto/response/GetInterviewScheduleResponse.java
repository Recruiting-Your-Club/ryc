package com.ryc.api.v1.interview.dto.response;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record GetInterviewScheduleResponse(
    @NotNull(message = "interviewDate shouldn't be null") LocalDate interviewDate,
    @NotEmpty(message = "interviewTimes shouldn't be empty")
        List<InterviewTimeDto> interviewTimes) {

  @Builder
  public record InterviewTimeDto(
      @NotEmpty(message = "interviewId shouldn't be empty") String interviewId,
      @NotNull(message = "interviewTimeNumber shouldn't be empty") Integer interviewTimeNumber) {}
}
