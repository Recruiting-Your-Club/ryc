package com.ryc.api.v2.club.presentation;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
@Validated
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
    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/{id}")
            .buildAndExpand(response.clubId())
            .toUri();
    return ResponseEntity.created(location).body(response);
  }

  @PutMapping("/{id}")
  @HasRole(Role.MEMBER)
  @Operation(
      summary = "동아리 수정 API",
      description = "ID에 해당하는 동아리를 수정합니다. 요청 본문에는 필요한 필드를 모두 포함해야 합니다.")
  @ApiErrorCodeExample(
      value = {ClubErrorCode.class, PermissionErrorCode.class, CommonErrorCode.class},
      include = {
        "DUPLICATE_CLUB_NAME",
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "CLUB_CATEGORY_BAD_REQUEST",
        "RESOURCE_NOT_FOUND",
        "INVALID_PARAMETER"
      })
  public ResponseEntity<DetailClubResponse> updateClub(
      @PathVariable
          @NotBlank(message = "동아리 id는 빈 값일 수 없습니다.")
          @UUID(message = "동아리 아이디는 UUID 포멧이어야 합니다.")
          String id,
      @Valid @RequestBody ClubUpdateRequest body) {
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
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<DetailClubResponse> getClub(
      @PathVariable
          @NotBlank(message = "동아리 아이디는 공백일 수 없습니다.")
          @UUID(message = "동아리 아이디는 UUID 포멧이어야 합니다.")
          String id) {
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

  @GetMapping("/invites/{invite-code}")
  @Operation(
      summary = "동아리 초대 코드로 동아리 조회 API",
      description = "동아리 초대 코드를 통해 동아리를 조회합니다. 초대 코드가 유효하지 않거나 만료된 경우 예외가 발생합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, ClubErrorCode.class},
      include = {"RESOURCE_NOT_FOUND", "CLUB_INVITE_EXPIRED"})
  // TODO: 동아리 초대코드 포멧 검사
  public ResponseEntity<SimpleClubResponse> getClubByInviteCode(
      @PathVariable("invite-code") @NotBlank(message = "동아리 초대코드는 공백일 수 없습니다.") String inviteCode) {
    SimpleClubResponse response = clubFacade.getClubByInviteCode(inviteCode);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("/{id}")
  @HasRole(Role.OWNER)
  @Operation(summary = "동아리 삭제 API", description = "해당 기능은 동아리 회장만 사용 가능합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<Void> deleteClub(
      @PathVariable
          @NotBlank(message = "동아리 아이디는 공백일 수 없습니다.")
          @UUID(message = "동아리 아이디는 UUID 포멧이어야 합니다.")
          String id) {
    clubFacade.deleteClub(id);
    return ResponseEntity.noContent().build();
  }
}
