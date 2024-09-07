package com.ryc.api.v1.interview.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record CreateInterviewRequest(@NotEmpty(message = "stepId shouldn't be empty") String stepId,
                                     @NotEmpty(message = "interviewSchedules shouldn't be empty") List<InterviewScheduleDto> interviewSchedules) {

    @Builder
    public record InterviewScheduleDto(@NotEmpty(message = "interviewDate shouldn't be empty") LocalDate interviewDate,
                                       @NotEmpty(message = "timeNumber shouldn't be empty") int timeNumber) {
    }
}
