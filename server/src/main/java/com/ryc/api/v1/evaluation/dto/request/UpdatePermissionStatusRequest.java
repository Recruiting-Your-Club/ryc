package com.ryc.api.v1.evaluation.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

public record UpdatePermissionStatusRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "permissionApplicationId shouldn't be empty")
        String permissionApplicationId,
    @NotNull(message = "requestStatus shouldn't be empty") RequestStatus requestStatus) {}
