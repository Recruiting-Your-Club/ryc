package com.ryc.api.v2.interview.presentation.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

public record NumberOfPeopleByInterviewDateRequest(
    @NotNull(message = "면접 시작 날짜와 시간은 null일 수 없습니다.")
        @Future(message = "면접 시작 시간은 미래의 시간이여야 합니다.")
        @Schema(description = "면접 시작 날짜와 시간")
        LocalDateTime start,
    @NotNull(message = "면접 당 진행 시간은 null일 수 없습니다.")
        @Min(value = 1, message = "면접 당 진행 시간은 0 이하일 수 없습니다.")
        @Schema(description = "면접 당 진행 시간(분)")
        Integer interviewDuration,
    @NotNull(message = "면접 날짜별 인원 수는 null일 수 없습니다.")
        @Min(value = 1, message = "인원 수는 1명 이상이어야 합니다.")
        @Schema(description = "인원 수")
        Integer numberOfPeople) {}
