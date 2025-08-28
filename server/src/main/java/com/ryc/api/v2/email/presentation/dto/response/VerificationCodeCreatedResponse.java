package com.ryc.api.v2.email.presentation.dto.response;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.swagger.v3.oas.annotations.media.Schema;

public record VerificationCodeCreatedResponse(
    @Schema(description = "만료 시각") LocalDateTime expiresAt) {

  public VerificationCodeCreatedResponse {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    expiresAt = LocalDateTime.parse(expiresAt.format(formatter));
  }
}
