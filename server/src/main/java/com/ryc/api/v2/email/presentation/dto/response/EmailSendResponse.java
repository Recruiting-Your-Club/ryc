package com.ryc.api.v2.email.presentation.dto.response;

import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.Builder;

@Builder
public record EmailSendResponse(String emailId, EmailSentStatus status, String statusUrl) {}
