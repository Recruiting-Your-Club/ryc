package com.ryc.api.v1.role.dto.response;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record GetClubRoleApplicationResponse(@NotEmpty(message = "clubRoleApplicationId shouldn't be empty") String clubRoleApplicationId,
                                             @NotEmpty(message = "username shouldn't be empty") String username,
                                             @NotNull(message = "requestAt shouldn't be null") LocalDateTime requestAt) {
}
