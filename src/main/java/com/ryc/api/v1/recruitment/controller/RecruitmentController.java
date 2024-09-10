package com.ryc.api.v1.recruitment.controller;

import com.ryc.api.v1.recruitment.dto.request.CreateRecruitmentRequest;
import com.ryc.api.v1.recruitment.dto.response.CreateRecruitmentResponse;
import com.ryc.api.v1.recruitment.service.RecruitmentService;
import com.ryc.api.v1.role.dto.request.ClubRoleRequest;
import com.ryc.api.v1.role.dto.response.ClubRoleResponse;
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
@RequestMapping("api/v1/recruitment")
@RequiredArgsConstructor
@Tag(name = "모집전형")
public class RecruitmentController {
    private final RecruitmentService recruitmentService;

    @PostMapping("/")
    public ResponseEntity<?> createRecruitment(@Valid @RequestBody CreateRecruitmentRequest body) {
        try {
            CreateRecruitmentResponse response = recruitmentService.createRecruitment(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
