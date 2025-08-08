package com.ryc.api.v2.club.presentation;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.club.service.ClubFacade;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/clubs")
@RequiredArgsConstructor
@Tag(name = "동아리")
public class ClubHttpApi {

  private final ClubFacade clubFacade;

  @PostMapping
  @Operation(summary = "동아리 생성 API")
  @ApiErrorCodeExample(
      value = {ClubErrorCode.class, CommonErrorCode.class},
      include = {"DUPLICATE_CLUB_NAME", "INVALID_PARAMETER"})
  public ResponseEntity<ClubCreateResponse> createClub(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @Valid @RequestBody ClubCreateRequest body) {
    ClubCreateResponse response = clubFacade.createClub(userDetail.getId(), body);
    URI location = URI.create(String.format("api/v2/clubs/%s", response.clubId()));
    return ResponseEntity.created(location).body(response);
  }

  @PutMapping("/{id}")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 수정 API", description = "ID에 해당하는 동아리를 수정합니다. 수정하고싶은 필드만 포함시켜주세요.")
  @ApiErrorCodeExample(
      value = {ClubErrorCode.class, PermissionErrorCode.class, CommonErrorCode.class},
      include = {
        "DUPLICATE_CLUB_NAME",
        "CLUB_NOT_FOUND",
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "CLUB_CATEGORY_NOT_FOUND",
        "INVALID_PARAMETER"
      })
  public ResponseEntity<DetailClubResponse> updateClub(
      @PathVariable String id, @Valid @RequestBody ClubUpdateRequest body) {
    DetailClubResponse response = clubFacade.updateClub(id, body);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping
  @Operation(summary = "모든 동아리 조회 API")
  public ResponseEntity<List<SimpleClubResponse>> getAllClub() {
    List<SimpleClubResponse> responses = clubFacade.getAllClubWithAnnouncementStatus();
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }

  @GetMapping("/{id}")
  @Operation(summary = "동아리 상세 조회 API", description = "동아리 ID로 하나의 동아리를 조회합니다.")
  @ApiErrorCodeExample(
      value = {ClubErrorCode.class},
      include = {"CLUB_NOT_FOUND"})
  public ResponseEntity<DetailClubResponse> getClub(@PathVariable String id) {
    DetailClubResponse response = clubFacade.getClub(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/my")
  @Operation(summary = "사용자가 속한 동아리 조회 API", description = "사용자가 속한 동아리들을 조회합니다.")
  public ResponseEntity<List<DetailClubResponse>> getMyClubs(
      @AuthenticationPrincipal CustomUserDetail userDetail) {
    List<DetailClubResponse> responses = clubFacade.getMyClubs(userDetail.getId());
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }
}
