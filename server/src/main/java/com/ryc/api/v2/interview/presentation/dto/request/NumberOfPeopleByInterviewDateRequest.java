package com.ryc.api.v2.interview.presentation.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import io.swagger.v3.oas.annotations.media.Schema;

public record NumberOfPeopleByInterviewDateRequest(
    @Schema(description = "면접 시작 날짜와 시간")
        @NotNull(message = "면접 시작 날짜와 시간은 null일 수 없습니다.")
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        @Future(message = "면접 시작 시간은 미래의 시간이여야 합니다.")
        LocalDateTime start,
    @Schema(description = "면접 당 진행 시간(분)")
        @NotNull(message = "면접 당 진행 시간은 null일 수 없습니다.")
        @Min(value = 1, message = "면접 당 진행 시간은 0분 이하일 수 없습니다.")
        Integer interviewDuration,
    @Schema(description = "인원 수")
        @NotNull(message = "면접 날짜별 인원 수는 null일 수 없습니다.")
        @Min(value = 1, message = "인원 수는 1명 이상이어야 합니다.")
        Integer numberOfPeople) {}
