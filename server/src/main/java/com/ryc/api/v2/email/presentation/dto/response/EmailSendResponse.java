package com.ryc.api.v2.email.presentation.dto.response;

import com.ryc.api.v2.email.domain.EmailStatus;

public record EmailSendResponse(String recipient, EmailStatus emailStatus) {

}
