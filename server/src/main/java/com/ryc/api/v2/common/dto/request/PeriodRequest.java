package com.ryc.api.v2.common.dto.request;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.ryc.api.v2.common.deserializer.EmptyStringToNullLocalDateTimeDeserializer;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 * @brief 기간 정보 Request Dto
 */
@Builder
@Schema(description = "기간 정보")
public record PeriodRequest(
    @Schema(
            type = "string",
            pattern = "yyyy-MM-dd'T'HH:mm",
            description = "시작 날짜",
            example = "2025-06-29T00:00")
        @JsonDeserialize(using = EmptyStringToNullLocalDateTimeDeserializer.class)
        LocalDateTime startDate,
    @Schema(
            type = "string",
            pattern = "yyyy-MM-dd'T'HH:mm",
            description = "끝 날짜",
            example = "2025-07-20T00:00")
        @JsonDeserialize(using = EmptyStringToNullLocalDateTimeDeserializer.class)
        LocalDateTime endDate) {}
