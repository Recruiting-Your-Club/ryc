package com.ryc.api.v2.admin.presentation;

import jakarta.validation.constraints.Email;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.admin.presentation.dto.request.AdminProfileUpdateRequest;
import com.ryc.api.v2.admin.presentation.dto.response.AdminEmailDuplicatedResponse;
import com.ryc.api.v2.admin.presentation.dto.response.MyInformationGetResponse;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v2/admin")
@Validated
@RequiredArgsConstructor
@Tag(name = "사용자")
public class AdminHttpApi {

  private final AdminService adminService;

  @GetMapping("/emails/duplicate-check")
  @Operation(
      summary = "이메일 중복 확인",
      description = "주어진 이메일이 이미 사용 중인지 확인합니다. 사용 중이면 true, 아니면 false를 반환합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"INVALID_PARAMETER"})
  public ResponseEntity<AdminEmailDuplicatedResponse> checkEmailDuplicate(
      @RequestParam @Email String email) {
    AdminEmailDuplicatedResponse response = adminService.checkEmailDuplicate(email);
    return ResponseEntity.ok(response);
  }

  @PatchMapping
  @Operation(
      summary = "나의 프로필 사진 수정",
      description = "나의 프로필 사진을 수정합니다.<br>만약 Image을 넣지 않거나 null로 넣을 경우 프로필 사진이 삭제됩니다.")
  public ResponseEntity<MyInformationGetResponse> updateAdminProfile(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @RequestBody AdminProfileUpdateRequest request) {
    MyInformationGetResponse response =
        adminService.updateAdminProfile(
            userDetail.getId(), userDetail.getUsername(), userDetail.getEmail(), request);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping()
  @Operation(summary = "회원 탈퇴")
  public ResponseEntity<Void> deleteAdmin(@AuthenticationPrincipal CustomUserDetail userDetail) {
    adminService.deleteAdminById(userDetail.getId());
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/me")
  @Operation(summary = "현재 로그인한 내정보 확인", description = "현재 로그인한 회원의 정보를 조회합니다.")
  @ApiErrorCodeExample(
      value = {},
      include = {})
  public ResponseEntity<MyInformationGetResponse> getCurrentAdmin(
      @AuthenticationPrincipal CustomUserDetail userDetail) {
    MyInformationGetResponse response =
        adminService.getCurrentAdmin(
            userDetail.getId(), userDetail.getUsername(), userDetail.getEmail());
    return ResponseEntity.ok(response);
  }
}
