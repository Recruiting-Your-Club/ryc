package com.ryc.api.v1.role.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v1.common.aop.annotation.HasPresidentRoleSecured;
import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.dto.request.ClubRoleRequest;
import com.ryc.api.v1.role.dto.request.UpdateStatusRequest;
import com.ryc.api.v1.role.dto.response.ClubRoleResponse;
import com.ryc.api.v1.role.dto.response.GetClubRoleApplicationResponse;
import com.ryc.api.v1.role.dto.response.UpdateStatusResponse;
import com.ryc.api.v1.role.service.RoleService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/role")
@RequiredArgsConstructor
@Tag(name = "동아리 내 권한")
public class RoleController {
  private final RoleService roleService;

  @PostMapping("/application")
  public ResponseEntity<?> createClubRoleApplication(@Valid @RequestBody ClubRoleRequest body) {
    try {
      ClubRoleResponse response = roleService.createClubRoleApplication(body);
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
  }

  @HasPresidentRoleSecured
  @GetMapping("/applications")
  public ResponseEntity<?> getClubRoleApplications(
      @NotEmpty @RequestParam String clubId,
      @RequestParam(required = false, defaultValue = "ALL") ClubRole clubRole,
      @RequestParam(required = false, defaultValue = "ALL") RequestStatus status) {
    try {
      List<GetClubRoleApplicationResponse> response =
          roleService.findClubRoleApplications(clubId, clubRole, status);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
    }
  }

  @HasPresidentRoleSecured
  @PostMapping("application/status")
  public ResponseEntity<?> updateClubRoleApplicationStatus(
      @Valid @RequestBody UpdateStatusRequest body) {
    try {
      UpdateStatusResponse response = roleService.updateClubRoleApplicationStatus(body);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }
}
