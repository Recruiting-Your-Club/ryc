package com.ryc.api.v2.role.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.presentation.dto.response.ClubInviteAcceptResponse;
import com.ryc.api.v2.role.presentation.dto.response.ClubInviteCreatedResponse;
import com.ryc.api.v2.role.presentation.dto.response.ClubRoleGetResponse;
import com.ryc.api.v2.role.service.ClubRoleService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2")
@RequiredArgsConstructor
@Tag(name = "동아리 내 권한")
public class ClubRoleHttpApi {

  private final ClubRoleService clubRoleService;

  @PostMapping("clubs/{club-id}/invites")
  @HasRole(Role.MEMBER)
  @Operation(
      summary = "동아리 초대 링크 생성",
      description = "동아리 초대 링크를 생성합니다.<br>만약 기존에 존재하면서, 만료되지 않은 초대 링크가 있다면, 해당 링크를 반환합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<ClubInviteCreatedResponse> createInviteCode(
      @PathVariable("club-id") String clubId) {
    ClubInviteCreatedResponse response = clubRoleService.createInviteCode(clubId);
    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/{id}")
            .buildAndExpand(response.inviteCode())
            .toUri();
    return ResponseEntity.created(location).body(response);
  }

  @PostMapping("clubs/{club-id}/invites/{invite-code}")
  @Operation(summary = "동아리 가입", description = "동아리 초대 링크를 통해 동아리에 가입합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, ClubErrorCode.class},
      include = {"RESOURCE_NOT_FOUND", "CLUB_MEMBER_ALREADY_EXISTS", "CLUB_INVITE_EXPIRED"})
  public ResponseEntity<ClubInviteAcceptResponse> acceptInvite(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable("club-id") String clubId,
      @PathVariable("invite-code") String inviteCode) {
    ClubInviteAcceptResponse response =
        clubRoleService.acceptInvite(userDetail.getId(), clubId, inviteCode);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping("clubs/{club-id}/users")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 내 사용자 조회", description = "동아리 내 모든 사용자의 정보를 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<ClubRoleGetResponse>> getClubRoles(
      @PathVariable("club-id") String clubId) {
    return ResponseEntity.ok(clubRoleService.getClubRoles(clubId));
  }

  @DeleteMapping("clubs/{club-id}/users/{user-id}")
  @HasRole(Role.OWNER)
  @Operation(
      summary = "동아리 내 사용자 삭제",
      description = "해당 기능은 동아리 회장만 수행할 수 있습니다. userId를 가진 사용자는 더 이상 동아리에서 활동하지 못하게 됩니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, ClubErrorCode.class, CommonErrorCode.class},
      include = {
        "FORBIDDEN_NOT_CLUB_OWNER",
        "CLUB_OWNER_CANNOT_BE_DELETED",
        "RECORD_NOT_FOUND",
      })
  public ResponseEntity<Void> deleteRole(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable("club-id") String clubId,
      @PathVariable("user-id") String userId) {
    clubRoleService.deleteRole(userDetail.getId(), clubId, userId);
    return ResponseEntity.noContent().build();
  }
}
