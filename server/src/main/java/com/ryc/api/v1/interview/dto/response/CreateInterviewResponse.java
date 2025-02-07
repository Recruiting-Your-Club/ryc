package com.ryc.api.v1.interview.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record CreateInterviewResponse(
        @NotEmpty(message = "interviewId shouldn't be empty") String interviewId,
        @NotEmpty(message = "interviewDate shouldn't be empty") LocalDate interviewDate,
        @NotEmpty(message = "interviewTime shouldn't be empty") int interviewTime) {
}
