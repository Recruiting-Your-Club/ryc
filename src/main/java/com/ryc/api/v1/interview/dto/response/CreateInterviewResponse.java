package com.ryc.api.v1.interview.dto.response;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.List;

public record CreateInterviewResponse(
        @NotEmpty(message = "createdAt shouldn't be empty") List<LocalDateTime> createdAt) {
}
