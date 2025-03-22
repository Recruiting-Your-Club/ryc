package com.ryc.api.v1.evaluation.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v1.common.aop.annotation.HasAnyRoleSecured;
import com.ryc.api.v1.common.aop.annotation.HasPresidentRoleSecured;
import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.dto.request.CreatePermissionApplicationRequest;
import com.ryc.api.v1.evaluation.dto.request.UpdatePermissionStatusRequest;
import com.ryc.api.v1.evaluation.dto.response.CreatePermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationAuthorizedUserResponse;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.UpdatePermissionStatusResponse;
import com.ryc.api.v1.evaluation.service.PermissionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/evaluation/permission")
@RequiredArgsConstructor
@Tag(name = "평가 권한")
public class PermissionController {
  private final PermissionService permissionService;

  @HasAnyRoleSecured
  @PostMapping("/request")
  public ResponseEntity<?> createEvaluationPermissionRequest(
      @Valid @RequestBody CreatePermissionApplicationRequest body) {
    CreatePermissionApplicationResponse response = permissionService.requestPermission(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @HasPresidentRoleSecured
  @GetMapping("/requests")
  public ResponseEntity<?> getEvaluationPermissionRequest(
      @NotEmpty @RequestParam String clubId,
      @NotEmpty @RequestParam String recruitmentId,
      @RequestParam(required = false, defaultValue = "ALL") RequestStatus status) {
    List<GetPermissionApplicationResponse> response =
        permissionService.findPermissionApplications(recruitmentId, status);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasPresidentRoleSecured
  @PostMapping("/status")
  public ResponseEntity<?> updateEvaluationPermissionStatus(
      @Valid @RequestBody UpdatePermissionStatusRequest body) {
    UpdatePermissionStatusResponse response =
        permissionService.updatePermissionApplicationStatus(body);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @HasPresidentRoleSecured
  @GetMapping("/users")
  public ResponseEntity<?> getEvaluationAuthorizedUserList(
      @NotEmpty @RequestParam String clubId, @NotEmpty @RequestParam String recruitmentId) {
    List<GetEvaluationAuthorizedUserResponse> response =
        permissionService.findEvaluationAuthorizedUsers(recruitmentId);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
