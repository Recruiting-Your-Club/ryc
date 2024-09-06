package com.ryc.api.v1.evaluation.controller;

import com.ryc.api.v1.evaluation.dto.request.CreatePasserRequest;
import com.ryc.api.v1.evaluation.dto.response.CreatePasserResponse;
import com.ryc.api.v1.evaluation.service.PassedService;
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
@RequestMapping("api/v1/evaluation/passer")
@RequiredArgsConstructor
@Tag(name = "합격자")
public class PassedController {
    private final PassedService passedService;

    @PostMapping("/")
    public ResponseEntity<?> createPasser(@Valid @RequestBody CreatePasserRequest body) {
        try {
            CreatePasserResponse response = passedService.createPasser(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
