package com.ryc.api.v1.role.controller;

import com.ryc.api.v1.role.dto.ClubRoleRequest;
import com.ryc.api.v1.role.dto.ClubRoleResponse;
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
@RequestMapping("api/v1/role")
@RequiredArgsConstructor
@Tag(name = "동아리 내 권한")
public class RoleController {
    private final RoleService roleService;

    @PostMapping("/")
    public ResponseEntity<?> createRole(@Valid @RequestBody ClubRoleRequest body) {
        try {
            ClubRoleResponse response = roleService.createClubRoleApplication(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
