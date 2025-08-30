package com.ryc.api.v2.email.presentation;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.EmailErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
import com.ryc.api.v2.email.presentation.dto.request.VerificationCodeCreatedRequest;
import com.ryc.api.v2.email.presentation.dto.request.VerificationCodeRequest;
import com.ryc.api.v2.email.presentation.dto.response.EmailSendResponse;
import com.ryc.api.v2.email.presentation.dto.response.VerificationCodeCreatedResponse;
import com.ryc.api.v2.email.service.EmailService;
import com.ryc.api.v2.email.service.EmailVerificationService;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2")
@RequiredArgsConstructor
@Validated
@Tag(name = "이메일")
public class EmailHttpApi {

  private final EmailService emailService;
  private final EmailVerificationService emailVerificationService;

  @PostMapping("/announcements/{announcement-id}/emails")
  @HasRole(Role.MEMBER)
  @Operation(summary = "이메일 전송 API", description = "이메일을 전송합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, CommonErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER", "INVALID_PARAMETER"})
  public ResponseEntity<List<EmailSendResponse>> sendEmail(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable("announcement-id")
          @NotBlank(message = "공고 아이디는 공백일 수 없습니다.")
          @UUID(message = "공고 아이디는 UUID 포멧이어야 합니다.")
          String announcementId,
      @Valid @RequestBody EmailSendRequest body) {
    List<EmailSendResponse> responses =
        emailService.createEmails(
            userDetail.getId(), announcementId, body.recipients(), body.subject(), body.content());
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(responses);
  }

  @PostMapping("/email-verifications")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"INVALID_PARAMETER"})
  @Operation(summary = "이메일 인증 코드 생성", description = "이메일 인증 코드 생성을 요청합니다<br>인증 코드는 해당 이메일에 발송됩니다.")
  public ResponseEntity<VerificationCodeCreatedResponse> createEmailVerificationCode(
      @Valid @RequestBody VerificationCodeCreatedRequest body) {
    VerificationCodeCreatedResponse response =
        emailVerificationService.createEmailVerificationCode(body.email());
    return ResponseEntity.ok(response);
  }

  @PatchMapping("/email-verifications")
  @Operation(summary = "이메일 인증 코드 검증", description = "이메일 인증 코드를 검증합니다.")
  @ApiErrorCodeExample(
      value = {EmailErrorCode.class, CommonErrorCode.class},
      include = {
        "EMAIL_VERIFICATION_CODE_EXPIRED",
        "EMAIL_ALREADY_VERIFIED",
        "INVALID_PARAMETER",
        "EMAIL_VERIFICATION_CODE_INVALID"
      })
  public ResponseEntity<Void> verifyEmailCode(@Valid @RequestBody VerificationCodeRequest body) {
    emailVerificationService.verificationEmailCode(body);
    return ResponseEntity.ok().build();
  }
}
