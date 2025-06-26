package com.ryc.api.v2.email.presentation.dto.response;

import com.ryc.api.v2.email.domain.EmailSentStatus;

public record EmailSendResponse(String recipient, EmailSentStatus emailSentStatus) {}
