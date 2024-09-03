package com.ryc.api.v1.evaluation.dto.response;

import com.ryc.api.v1.common.constant.RequestStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UpdatePermissionStatusResponse(@NotNull(message = "reviewedAt shouldn't be empty") LocalDateTime reviewedAt,
                                             @NotNull(message = "requestStatus shouldn't be empty") RequestStatus requestStatus,
                                             @NotEmpty(message = "reviewedBy shouldn't be empty") String reviewedBy) {
}
