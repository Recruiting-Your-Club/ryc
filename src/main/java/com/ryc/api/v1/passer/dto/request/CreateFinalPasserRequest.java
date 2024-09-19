package com.ryc.api.v1.passer.dto.request;

import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateFinalPasserRequest(
        @NotNull(message = "clubRoleSecuredDto shouldn't be null") ClubRoleSecuredDto clubRoleSecuredDto,
        @NotEmpty(message = "applicantIdList shouldn't be empty") List<String> applicantIdList) {
}
