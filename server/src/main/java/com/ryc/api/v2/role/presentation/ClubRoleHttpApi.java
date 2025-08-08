package com.ryc.api.v2.role.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.presentation.dto.response.AdminsGetResponse;
import com.ryc.api.v2.role.presentation.dto.response.RoleDemandResponse;
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

  @PostMapping("clubs/{clubId}/roles")
  @Operation(summary = "동아리 권한 요청", description = "동아리 권한을 요청합니다. 요청 즉시 동아리 멤버가 됩니다.")
  // TODO: getAdminById에 대한 ApiErrorCodeExample 추가 필요
  @ApiErrorCodeExample(
      value = {
        CommonErrorCode.class,
      },
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<RoleDemandResponse> demandRole(
      @AuthenticationPrincipal CustomUserDetail userDetail, @PathVariable String clubId) {

    RoleDemandResponse roleDemandResponse = clubRoleService.assignRole(userDetail.getId(), clubId);
    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("{role-id}")
            .buildAndExpand(roleDemandResponse.roleId())
            .toUri();

    return ResponseEntity.created(location).body(roleDemandResponse);
  }

  @GetMapping("clubs/{clubId}/users")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 내 사용자 조회", description = "동아리 내 모든 사용자의 정보를 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<AdminsGetResponse>> getAdminsInClub(@PathVariable String clubId) {
    return ResponseEntity.ok(clubRoleService.getAdminsInClub(clubId));
  }

  @DeleteMapping("clubs/{clubId}/users/{userId}")
  @HasRole(Role.OWNER)
  @Operation(
      summary = "동아리 내 사용자 삭제",
      description = "해당 기능은 동아리 회장만 수행할 수 있습니다. userId를 가진 사용자는 더 이상 동아리에서 활동하지 못하게 됩니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, ClubErrorCode.class},
      include = {
        "FORBIDDEN_NOT_CLUB_OWNER",
        "CLUB_OWNER_CANNOT_BE_DELETED",
        "CLUB_MEMBER_NOT_FOUND"
      })
  public ResponseEntity<Void> deleteRole(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable String clubId,
      @PathVariable String userId) {
    clubRoleService.deleteRole(userDetail.getId(), clubId, userId);
    return ResponseEntity.noContent().build();
  }
}
