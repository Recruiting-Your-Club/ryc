package com.ryc.api.v2.email.presentation.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record EmailSendRequest(
        @NotNull(message = "recipients shouldn't be null")
        List<@Email(message = "recipient format is incorrect.") @NotBlank(message = "recipient shouldn't be blank")String> recipients,
    @NotBlank(message = "subject shouldn't be blank") String subject,
    @NotBlank(message = "content shouldn't be blank") String content) {

        @Override
        public List<String> recipients() {
            return List.copyOf(recipients);
        }
}
