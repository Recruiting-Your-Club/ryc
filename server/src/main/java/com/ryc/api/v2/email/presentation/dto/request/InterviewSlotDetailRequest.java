package com.ryc.api.v2.email.presentation.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ryc.api.v2.common.deserializer.EmptyStringToNullLocalDateTimeDeserializer;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotDetailRequest(
    @Schema(description = "면접 시작 날짜와 시간")
        @NotNull(message = "면접 시작 날짜와 시간은 null일 수 없습니다.")
        @JsonDeserialize(using = EmptyStringToNullLocalDateTimeDeserializer.class)
        @Future(message = "면접 시작 시간은 미래의 시간이여야 합니다.")
        LocalDateTime start,
    @Schema(description = "최대 인원 수")
        @NotNull(message = "면접 날짜별 인원 수는 null일 수 없습니다.")
        @Min(value = 1, message = "인원 수는 1명 이상이어야 합니다.")
        Integer maxPeopleCount) {}
