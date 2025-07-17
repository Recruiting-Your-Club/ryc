package com.ryc.api.v2.admin.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.admin.presentation.response.AdminEmailDuplicatedResponse;
import com.ryc.api.v2.admin.service.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v2/admin")
@RequiredArgsConstructor
@Tag(name = "사용자")
public class AdminHttpApi {

  private AdminService adminService;

  @GetMapping("/emails/duplicate-check")
  @Operation(
      summary = "이메일 중복 확인",
      description = "주어진 이메일이 이미 사용 중인지 확인합니다. 사용 중이면 true, 아니면 false를 반환합니다.")
  @ApiResponse(responseCode = "200", description = "이메일 중복 확인 성공")
  public ResponseEntity<AdminEmailDuplicatedResponse> checkEmailDuplicate(
      @RequestParam String email) {
    AdminEmailDuplicatedResponse response = adminService.checkEmailDuplicate(email);
    return ResponseEntity.ok(response);
  }
}
