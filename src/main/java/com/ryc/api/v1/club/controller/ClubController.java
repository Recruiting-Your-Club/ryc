package com.ryc.api.v1.club.controller;

import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;
import com.ryc.api.v1.club.service.ClubService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/club")
@RequiredArgsConstructor
@Tag(name = "club")
public class ClubController {
    private final ClubService clubService;

    @PostMapping("/")
    public ResponseEntity<?> createClub(@Valid @RequestBody CreateClubRequest body) {
        try {
            CreateClubResponse responseDto = clubService.createClub(body);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
