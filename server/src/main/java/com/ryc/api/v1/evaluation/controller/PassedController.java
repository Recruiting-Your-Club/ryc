package com.ryc.api.v1.evaluation.controller;

import com.ryc.api.v1.common.aop.annotation.HasAnyRoleSecured;
import com.ryc.api.v1.common.aop.annotation.HasPresidentRoleSecured;
import com.ryc.api.v1.evaluation.dto.request.CreatePasserRequest;
import com.ryc.api.v1.evaluation.dto.response.CreatePasserResponse;
import com.ryc.api.v1.evaluation.dto.response.GetPasserResponse;
import com.ryc.api.v1.evaluation.service.PassedService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/evaluation/passer")
@RequiredArgsConstructor
@Tag(name = "합격자")
public class PassedController {
    private final PassedService passedService;

    @HasPresidentRoleSecured
    @PostMapping("/")
    public ResponseEntity<?> createPasser(@Valid @RequestBody CreatePasserRequest body) {
        try {
            CreatePasserResponse response = passedService.createPasser(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @HasAnyRoleSecured
    @GetMapping("/")
    public ResponseEntity<?> getPasser(@NotEmpty @RequestParam String clubId,
                                       @NotEmpty @RequestParam String stepId) {
        try {
            List<GetPasserResponse> response = passedService.getPasser(stepId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
