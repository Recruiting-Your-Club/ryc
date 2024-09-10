package com.ryc.api.v1.passer.dto.request;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateFinalPasserRequest(@NotEmpty(message = "applicantIdList shouldn't be empty") List<String> applicantIdList) {
}
