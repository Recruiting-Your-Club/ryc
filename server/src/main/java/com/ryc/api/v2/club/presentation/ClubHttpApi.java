package com.ryc.api.v2.club.presentation;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.club.presentation.dto.request.CreateClubRequest;
import com.ryc.api.v2.club.presentation.dto.response.CreateClubResponse;
import com.ryc.api.v2.club.service.ClubService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/** 클라이언트나 외부 서버 어플리케이션에서 Http 기반으로 접근하는 API */
@RestController
@RequestMapping("api/v2/club")
@RequiredArgsConstructor
@Tag(name = "동아리")
public class ClubHttpApi {
  private final ClubService clubService;

  @PostMapping("/")
  public ResponseEntity<?> createClub(@Valid @RequestBody CreateClubRequest body) {
    CreateClubResponse response = clubService.createClub(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
