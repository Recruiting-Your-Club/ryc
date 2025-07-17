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
import com.ryc.api.v2.club.presentation.dto.response.ClubGetByAdminIdResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.club.service.ClubAnnouncementFacade;
import com.ryc.api.v2.club.service.ClubFacade;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
  @ApiResponses({
    @ApiResponse(responseCode = "201", description = "동아리 생성 성공"),
    @ApiResponse(
        responseCode = "400",
        description = "이미 존재하는 동아리 이름",
        content = @Content(schema = @Schema(hidden = true)))
  })
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
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "동아리 수정 성공"),
    @ApiResponse(
        responseCode = "404",
        description = "동아리 ID가 존재하지 않음",
        content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(
        responseCode = "400",
        description = "이미 존재하는 동아리 이름으로 수정하려고 함",
        content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<ClubUpdateResponse> updateClub(
      @PathVariable String id, @RequestBody ClubUpdateRequest body) {
    ClubUpdateResponse response = clubFacade.updateClub(id, body);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping
  @Operation(summary = "모든 동아리 조회 API")
  @ApiResponse(responseCode = "200", description = "모든 동아리 조회 성공")
  public ResponseEntity<List<AllClubGetResponse>> getAllClub() {
    List<AllClubGetResponse> responses = clubAnnouncementFacade.getAllClubWithAnnouncementStatus();
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }

  @GetMapping("/{id}")
  @Operation(summary = "동아리 상세 조회 API", description = "동아리 ID로 하나의 동아리를 조회합니다.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "동아리 상세 조회 성공"),
    @ApiResponse(
        responseCode = "404",
        description = "동아리 ID가 존재하지 않음",
        content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<ClubGetResponse> getClub(@PathVariable String id) {
    ClubGetResponse response = clubFacade.getClub(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/my")
  @HasRole(Role.MEMBER)
  @Operation(summary = "사용자가 속한 동아리 조회 API", description = "사용자가 속한 동아리들을 조회합니다.")
  @ApiResponse(responseCode = "200", description = "사용자가 속한 동아리 조회 성공")
  public ResponseEntity<List<ClubGetByAdminIdResponse>> getClubByAdminId(
      @AuthenticationPrincipal CustomUserDetail userDetail) {
    List<ClubGetByAdminIdResponse> responses = clubFacade.getClubByAdminId(userDetail.getId());
    return ResponseEntity.status(HttpStatus.OK).body(responses);
  }
}
