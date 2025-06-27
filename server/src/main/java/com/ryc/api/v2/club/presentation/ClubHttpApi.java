package com.ryc.api.v2.club.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.club.business.ClubAnnouncementFacade;
import com.ryc.api.v2.club.business.ClubService;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/** 클라이언트나 외부 서버 어플리케이션에서 Http 기반으로 접근하는 API */
@RestController
@RequestMapping("api/v2/clubs")
@RequiredArgsConstructor
@Tag(name = "동아리")
public class ClubHttpApi {

  private final ClubService clubService;
  private final ClubAnnouncementFacade clubAnnouncementFacade;

  @PostMapping
  @Operation(summary = "동아리 생성 API")
  public ResponseEntity<ClubCreateResponse> createClub(@Valid @RequestBody ClubCreateRequest body) {
    ClubCreateResponse response = clubService.createClub(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping("/{id}")
  @Operation(summary = "동아리 조회 API", description = "동아리 ID로 하나의 동아리를 조회합니다.")
  public ResponseEntity<ClubGetResponse> getClub(@PathVariable String id) {
    ClubGetResponse response = clubService.getClub(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping
  @Operation(summary = "모든 동아리 조회 API")
  public ResponseEntity<List<AllClubGetResponse>> getAllClub() {
    List<AllClubGetResponse> responses = clubAnnouncementFacade.getAllClubWithAnnouncementStatus();
    return ResponseEntity.status(HttpStatus.OK)
        .body(responses);
  }

  @PatchMapping("/{id}")
  @Operation(summary = "동아리 수정 API", description = "ID에 해당하는 동아리를 수정합니다. 수정하고싶은 필드만 포함시켜주세요.")
  public ResponseEntity<ClubUpdateResponse> updateClub(
      @PathVariable String id, @RequestBody ClubUpdateRequest body) {
    return ResponseEntity.status(HttpStatus.OK).body(clubService.updateClub(id, body));
  }
}
