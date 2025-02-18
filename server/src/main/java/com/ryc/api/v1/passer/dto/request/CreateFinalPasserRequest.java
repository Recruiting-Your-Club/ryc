package com.ryc.api.v1.passer.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

public record CreateFinalPasserRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be null")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "applicantIdList shouldn't be empty") List<String> applicantIdList) {}
