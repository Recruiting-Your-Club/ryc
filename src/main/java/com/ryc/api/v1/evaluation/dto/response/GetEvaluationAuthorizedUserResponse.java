package com.ryc.api.v1.evaluation.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record GetEvaluationAuthorizedUserResponse(@NotEmpty(message = "permissionId shouldn't be empty") String permissionId,
                                                  @NotEmpty(message = "userId shouldn't be empty") String userId,
                                                  @NotEmpty(message = "username shouldn't be empty") String username) {
}
