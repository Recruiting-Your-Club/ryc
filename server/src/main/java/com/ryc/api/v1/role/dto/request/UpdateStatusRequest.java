package com.ryc.api.v1.role.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

public record UpdateStatusRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "clubRoleApplicationId shouldn't be empty") String clubRoleApplicationId,
    @NotNull(message = "requestStatus shouldn't be empty") RequestStatus requestStatus) {}
