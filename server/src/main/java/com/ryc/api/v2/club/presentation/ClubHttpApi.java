package com.ryc.api.v2.club.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.service.ClubService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/** 클라이언트나 외부 서버 어플리케이션에서 Http 기반으로 접근하는 API */
@RestController
@RequestMapping("api/v2/clubs")
@RequiredArgsConstructor
@Tag(name = "동아리")
public class ClubHttpApi {

  private final ClubService clubService;

  @PostMapping
  public ResponseEntity<?> createClub(@Valid @RequestBody ClubCreateRequest body) {
    ClubCreateResponse response = clubService.createClub(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ClubGetResponse> getClub(@PathVariable String id) {
    ClubGetResponse response = clubService.getClub(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/all")
  public ResponseEntity<List<AllClubGetResponse>> getAllClub() {
    return ResponseEntity.status(HttpStatus.OK).body(clubService.getAllClub());
  }
}
