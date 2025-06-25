package com.ryc.api.v2.email.presentation.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Builder;

@Builder
public record EmailSendRequest(
    @Email(message = "recipient format is incorrect.")
        @NotBlank(message = "recipient shouldn't be blank")
        String recipient,
    @NotBlank(message = "subject shouldn't be blank") String subject,
    @NotBlank(message = "content shouldn't be blank") String content) {}
