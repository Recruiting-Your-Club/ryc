package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MaxNumberOfPeopleUpdatedRequest(
    @NotNull(message = "최대 인원 수는 null일 수 없습니다.") @Min(value = 1, message = "최대 인원 수는 1명 이상이어야 합니다.")
        Integer maxPeopleCount) {}
