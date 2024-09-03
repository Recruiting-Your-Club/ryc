package com.ryc.api.v1.evaluation.dto.request;

import com.ryc.api.v1.common.constant.RequestStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UpdatePermissionStatusRequest(
        @NotEmpty(message = "permissionApplicationId shouldn't be empty") String permissionApplicationId,
        @NotNull(message = "requestStatus shouldn't be empty") RequestStatus requestStatus){
}
