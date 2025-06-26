package com.ryc.api.v2.email.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.email.business.EmailFacade;
import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;
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

  private final EmailFacade emailFacade;

  @PostMapping
  @Operation(summary = "이메일 전송 API", description = "이메일을 전송합니다.")
  public ResponseEntity<List<EmailSendResponse>> sendEmail(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @RequestParam String clubId,
      @RequestBody EmailSendRequest body)
      throws AccessDeniedException {
    List<EmailSendResponse> responses = emailFacade.sendAndSaveEmails(userDetail, clubId, body);
    return ResponseEntity.status(201).body(responses);
  }
}
