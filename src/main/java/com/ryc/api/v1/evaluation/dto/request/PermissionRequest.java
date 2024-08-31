package com.ryc.api.v1.evaluation.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record PermissionRequest(@NotEmpty(message = "recruitmentId shouldn't be empty") String recruitmentId) {
}
