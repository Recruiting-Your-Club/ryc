package com.ryc.api.v2.announcement.presentation.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;

/**
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 * @brief 기간 정보 Request Dto
 */
@Builder
public record PeriodRequest(
    @NotNull(message = "startDate shouldn't be null")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime startDate,
    @NotNull(message = "endDate shouldn't be null")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
        LocalDateTime endDate) {}
