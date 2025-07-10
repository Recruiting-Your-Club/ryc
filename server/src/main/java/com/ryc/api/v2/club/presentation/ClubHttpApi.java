package com.ryc.api.v2.club.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.*;
import com.ryc.api.v2.club.service.ClubAnnouncementFacade;
import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.role.service.ClubRoleService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/** 클라이언트나 외부 서버 어플리케이션에서 Http 기반으로 접근하는 API */
@RestController
@RequestMapping("api/v2/clubs")
@RequiredArgsConstructor
@Tag(name = "동아리")
public class ClubHttpApi {

  private final ClubRoleService clubRoleService;
  private final ClubService clubService;
  private final ClubAnnouncementFacade clubAnnouncementFacade;

  @PostMapping
  @Operation(summary = "동아리 생성 API")
  public ResponseEntity<ClubCreateResponse> createClub(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody ClubCreateRequest body) {
    ClubCreateResponse response = clubService.createClub(userDetail.getId(), body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PatchMapping("/{id}")
  @Operation(summary = "동아리 수정 API", description = "ID에 해당하는 동아리를 수정합니다. 수정하고싶은 필드만 포함시켜주세요.")
  public ResponseEntity<ClubUpdateResponse> updateClub(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable String id,
      @RequestBody ClubUpdateRequest body) {

    ClubRoleSecuredDto dto = new ClubRoleSecuredDto(userDetail.getId(), id);
    ClubUpdateResponse response = clubService.updateClub(dto, body);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping
  @Operation(summary = "모든 동아리 조회 API")
  public ResponseEntity<List<AllClubGetResponse>> getAllClub() {
    List<AllClubGetResponse> responses = clubAnnouncementFacade.getAllClubWithAnnouncementStatus();
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }

  @GetMapping("/{id}")
  @Operation(summary = "동아리 상세 조회 API", description = "동아리 ID로 하나의 동아리를 조회합니다.")
  public ResponseEntity<ClubGetResponse> getClub(@PathVariable String id) {
    ClubGetResponse response = clubService.getClub(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/my")
  @Operation(summary = "사용자가 속한 동아리 조회 API", description = "사용자가 속한 동아리들을 조회합니다.")
  public ResponseEntity<List<ClubGetByAdminIdResponse>> getClubByAdminId(
      @AuthenticationPrincipal CustomUserDetail userDetail) {
    List<ClubGetByAdminIdResponse> responses = clubRoleService.getClubByAdminId(userDetail.getId());
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }
}
