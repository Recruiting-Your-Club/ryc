package com.ryc.api.v1.evaluation.controller;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v1.common.aop.annotation.HasAnyRoleSecured;
import com.ryc.api.v1.common.aop.annotation.HasPresidentRoleSecured;
import com.ryc.api.v1.evaluation.dto.request.CreatePasserRequest;
import com.ryc.api.v1.evaluation.dto.response.CreatePasserResponse;
import com.ryc.api.v1.evaluation.dto.response.GetPasserResponse;
import com.ryc.api.v1.evaluation.service.PassedService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/evaluation/passer")
@RequiredArgsConstructor
@Tag(name = "합격자")
public class PassedController {
  private final PassedService passedService;

  @HasPresidentRoleSecured
  @PostMapping("/")
  public ResponseEntity<?> createPasser(@Valid @RequestBody CreatePasserRequest body) {
    CreatePasserResponse response = passedService.createPasser(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @HasAnyRoleSecured
  @GetMapping("/")
  public ResponseEntity<?> getPasser(
      @NotEmpty @RequestParam String clubId, @NotEmpty @RequestParam String stepId) {
    List<GetPasserResponse> response = passedService.getPasser(stepId);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
