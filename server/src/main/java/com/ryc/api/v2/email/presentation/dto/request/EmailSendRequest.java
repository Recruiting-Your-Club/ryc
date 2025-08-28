package com.ryc.api.v2.email.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.ryc.api.v2.common.validator.request.annotation.Email;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record EmailSendRequest(
    @NotNull(message = "수신자 목록은 null일 수 없습니다.")
        List<@NotBlank(message = "수신자 이메일은 빈 값일 수 없습니다.") @Email String> recipients,
    @Schema(description = "메일 제목")
        @NotBlank(message = "메일 제목은 비워둘 수 없습니다.")
        @Size(max = 255, message = "메일 제목은 255자를 초과할 수 없습니다.")
        String subject,
    @Schema(description = "메일 본문")
        @NotBlank(message = "메일 본문은 비워둘 수 없습니다.")
        @Size(max = 10000, message = "메일 본문은 10000자를 초과할 수 없습니다.")
        String content) {

  @Override
  @Schema(description = "수신자 목록")
  public List<String> recipients() {
    return List.copyOf(recipients);
  }
}
