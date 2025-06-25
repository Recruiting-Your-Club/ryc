package com.ryc.api.v2.email.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.email.business.EmailService;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/emails")
@RequiredArgsConstructor
@Tag(name = "이메일")
public class EmailHttpApi {

  private final EmailService emailService;

  @PostMapping
  @Operation(summary = "이메일 전송 API", description = "이메일을 전송합니다.")
  public ResponseEntity<EmailSendResponse> sendEmail(@RequestBody EmailSendRequest body) {
    EmailSendResponse response = emailService.sendEmail(body);
    return ResponseEntity.status(201).body(response);
  }
}
