package com.ryc.api.v2.email.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record EmailSendRequest(
    @NotNull(message = "수신자 목록은 null일 수 없습니다.")
        List<
                @Email(message = "수신자 이메일 형식이 올바르지 않습니다.")
                @NotBlank(message = "수신자 이메일은 비워둘 수 없습니다.") String>
            recipients,
    @NotBlank(message = "제목은 비워둘 수 없습니다.") @Schema(description = "제목") String subject,
    @NotBlank(message = "본문은 비워둘 수 없습니다.") @Schema(description = "본문") String content) {

  @Override
  @Schema(description = "수신자 목록")
  public List<String> recipients() {
    return List.copyOf(recipients);
  }
}
