package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;

import io.swagger.v3.oas.annotations.media.Schema;

public record NumberOfPeopleByInterviewDateRequest(
    @NotNull(message = "면접 날짜는 null일 수 없습니다.") @Valid PeriodRequest interviewPeriod,
    @NotNull(message = "면접 날짜별 인원 수는 null일 수 없습니다.") @Schema(description = "인원 수")
        Integer numberOfPeople) {}
