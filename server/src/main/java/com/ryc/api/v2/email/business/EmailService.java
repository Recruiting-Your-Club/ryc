package com.ryc.api.v2.email.business;

import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

  private final AuthService authService;

  public EmailSendResponse sendEmail(EmailSendRequest body) {

  }
}
