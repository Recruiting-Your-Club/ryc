package com.ryc.api.v1.evaluation.controller;

import com.ryc.api.v1.evaluation.dto.request.PermissionRequest;
import com.ryc.api.v1.evaluation.dto.response.PermissionResponse;
import com.ryc.api.v1.evaluation.service.PermissionRequestService;
import com.ryc.api.v1.role.dto.request.ClubRoleRequest;
import com.ryc.api.v1.role.dto.response.ClubRoleResponse;
import com.ryc.api.v1.role.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/evaluation/permission")
@RequiredArgsConstructor
@Tag(name = "평가 권한")
public class PermissionRequestController {
    private final PermissionRequestService permissionRequestService;

    @PostMapping("/request")
    public ResponseEntity<?> createEvaluationPermissionRequest(@Valid @RequestBody PermissionRequest body) {
        try {
            PermissionResponse response = permissionRequestService.requestPermission(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
