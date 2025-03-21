package com.ryc.api.v1.evaluation.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

public record CreatePermissionApplicationRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "recruitmentId shouldn't be empty") String recruitmentId) {}
