package com.ryc.api.v2.email.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.email.application.EmailService;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.InterviewEmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.security.dto.CustomUserDetail;

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
  public ResponseEntity<List<EmailSendResponse>> sendEmail(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @RequestParam String announcementId,
      @Valid @RequestBody EmailSendRequest body) {
    List<EmailSendResponse> responses =
        emailService.createEmails(userDetail.getId(), announcementId, body);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(responses);
  }

  @PostMapping("/interview")
  @Operation(summary = "면접 이메일 전송 API", description = "지원자가 면접 일정을 선택할 수 있는 이메일을 전송합니다.")
  public ResponseEntity<List<EmailSendResponse>> sendInterviewEmail(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @RequestParam String announcementId,
      @Valid @RequestBody InterviewEmailSendRequest body) {
    List<EmailSendResponse> responses =
        emailService.createInterviewDateEmails(userDetail.getId(), announcementId, body);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(responses);
  }
}
