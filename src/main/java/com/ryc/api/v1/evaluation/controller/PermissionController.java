package com.ryc.api.v1.evaluation.controller;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.dto.request.CreatePermissionApplicationRequest;
import com.ryc.api.v1.evaluation.dto.request.UpdatePermissionStatusRequest;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.CreatePermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.UpdatePermissionStatusResponse;
import com.ryc.api.v1.evaluation.service.PermissionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/evaluation/permission")
@RequiredArgsConstructor
@Tag(name = "평가 권한")
public class PermissionController {
    private final PermissionService permissionService;

    @PostMapping("/request")
    public ResponseEntity<?> createEvaluationPermissionRequest(@Valid @RequestBody CreatePermissionApplicationRequest body) {
        try {
            CreatePermissionApplicationResponse response = permissionService.requestPermission(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getEvaluationPermissionRequest(
            @NotEmpty @RequestParam String recruitmentId,
            @RequestParam(required = false, defaultValue = "ALL") RequestStatus status) {
        try {
            List<GetPermissionApplicationResponse> response = permissionService.findPermissionApplications(recruitmentId, status);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/status")
    public ResponseEntity<?> updateEvaluationPermissionStatus(@Valid @RequestBody UpdatePermissionStatusRequest body) {
        try {
            UpdatePermissionStatusResponse response = permissionService.updatePermissionApplicationStatus(body);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
