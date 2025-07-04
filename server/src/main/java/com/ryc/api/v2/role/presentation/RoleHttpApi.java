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

import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.role.presentation.dto.response.AdminsGetResponse;
import com.ryc.api.v2.role.presentation.dto.response.RoleDemandResponse;
import com.ryc.api.v2.role.service.RoleService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2")
@RequiredArgsConstructor
@Tag(name = "동아리 내 권한")
public class RoleHttpApi {

  private final RoleService roleService;

  @PostMapping("clubs/{clubId}/roles")
  @Operation(summary = "동아리 권한 요청", description = "동아리 권한을 요청합니다. 요청 즉시 동아리 멤버가 됩니다.")
  public ResponseEntity<RoleDemandResponse> demandRole(
      @AuthenticationPrincipal CustomUserDetail userDetail, @PathVariable String clubId) {

    RoleDemandResponse roleDemandResponse = roleService.assignRole(userDetail.getId(), clubId);
    URI location =
        URI.create(String.format("api/v2/clubs/%s/roles/%s", clubId, roleDemandResponse.roleId()));
    return ResponseEntity.created(location).body(roleDemandResponse);
  }

  @GetMapping("clubs/{clubId}/users")
  @Operation(summary = "동아리 내 사용자 조회", description = "동아리 내 모든 사용자의 정보를 조회합니다.")
  public ResponseEntity<List<AdminsGetResponse>> getAdminsInClub(
      @AuthenticationPrincipal CustomUserDetail userDetail, @PathVariable String clubId) {

    ClubRoleSecuredDto dto = new ClubRoleSecuredDto(userDetail.getId(), clubId);
    return ResponseEntity.ok(roleService.getAdminsInClub(dto));
  }

  @DeleteMapping("clubs/{clubId}/users/{userId}")
  @Operation(
      summary = "동아리 내 사용자 삭제",
      description = "해당 기능은 동아리 회장만 수행할 수 있습니다. userId를 가진 사용자는 더 이상 동아리에서 활동하지 못하게 됩니다.")
  public ResponseEntity<Void> deleteRole(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable String clubId,
      @PathVariable String userId) {

    ClubRoleSecuredDto dto = new ClubRoleSecuredDto(userDetail.getId(), clubId);
    roleService.deleteRole(dto, userId);
    return ResponseEntity.noContent().build();
  }
}
