package com.ryc.api.v2.club.presentation;

import java.net.URI;
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
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.club.presentation.dto.response.MyClubGetResponse;
import com.ryc.api.v2.club.service.ClubAnnouncementFacade;
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
  private final ClubAnnouncementFacade clubAnnouncementFacade;

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

  @PatchMapping("/{id}")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 수정 API", description = "ID에 해당하는 동아리를 수정합니다. 수정하고싶은 필드만 포함시켜주세요.")
  @ApiErrorCodeExample(
      value = {ClubErrorCode.class, PermissionErrorCode.class},
      include = {"DUPLICATE_CLUB_NAME", "CLUB_NOT_FOUND", "FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<ClubUpdateResponse> updateClub(
      @PathVariable String id, @RequestBody ClubUpdateRequest body) {
    ClubUpdateResponse response = clubFacade.updateClub(id, body);
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
  @ApiErrorCodeExample(
      value = {ClubErrorCode.class},
      include = {"CLUB_NOT_FOUND"})
  public ResponseEntity<ClubGetResponse> getClub(@PathVariable String id) {
    ClubGetResponse response = clubFacade.getClub(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/my")
  @Operation(summary = "사용자가 속한 동아리 조회 API", description = "사용자가 속한 동아리들을 조회합니다.")
  public ResponseEntity<List<MyClubGetResponse>> getClubByAdminId(
      @AuthenticationPrincipal CustomUserDetail userDetail) {
    List<MyClubGetResponse> responses = clubFacade.getClubByAdminId(userDetail.getId());
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }
}
