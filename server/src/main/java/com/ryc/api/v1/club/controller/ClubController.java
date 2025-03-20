package com.ryc.api.v1.club.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.ClubOverviewResponse;
import com.ryc.api.v1.club.dto.response.ClubResponse;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;
import com.ryc.api.v1.club.service.ClubService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

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
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAllClubsOverview() {
    try {
      List<ClubOverviewResponse> response = clubService.findAllClubsOverview();
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
    }
  }

  @GetMapping("/")
  public ResponseEntity<?> getClub(@RequestParam(required = true) String clubId) {
    try {
      ClubResponse response = clubService.findClubById(clubId);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
    }
  }
}
