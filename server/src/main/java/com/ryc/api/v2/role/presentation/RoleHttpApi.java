package com.ryc.api.v2.role.presentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

  @PostMapping("/clubs/{clubId}/roles")
  @Operation(summary = "동아리 권한 요청", description = "동아리 권한을 요청합니다. 요청 즉시 동아리 멤버가 됩니다.")
  public ResponseEntity<RoleDemandResponse> demandRole(
      @AuthenticationPrincipal CustomUserDetail userDetail, @PathVariable String clubId) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(roleService.assignRole(userDetail.getId(), clubId));
  }
}
