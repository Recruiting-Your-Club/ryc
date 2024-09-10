package com.ryc.api.v1.passer.controller;

import com.ryc.api.v1.applicant.dto.response.GetAllApplicantResponse;
import com.ryc.api.v1.passer.dto.request.CreateFinalPasserRequest;
import com.ryc.api.v1.passer.dto.response.CreateFinalPasserResponse;
import com.ryc.api.v1.passer.dto.response.GetAllFinalPasserResponse;
import com.ryc.api.v1.passer.service.PasserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/passer")
@RequiredArgsConstructor
@Tag(name = "합격자 관리")
public class PasserController {
    private final PasserService passerService;

    @PostMapping("/final")
    public ResponseEntity<?> createFinalPasser(@Valid @RequestBody CreateFinalPasserRequest body) {
        try {
            List<CreateFinalPasserResponse> response = passerService.createFinalPasser(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/final")
    public ResponseEntity<?> getAllFinalPasser(@RequestParam(required = true) String recruitmentId) {
        try {
            List<GetAllFinalPasserResponse> response = passerService.findAllFinalPasser(recruitmentId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
