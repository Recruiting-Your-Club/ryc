package com.ryc.api.v2.announcement.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.announcement.presentation.dto.response.*;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;
import com.ryc.api.v2.common.exception.response.ErrorResponse;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RequestMapping("/api/v2")
@Tag(name = "공고")
public interface AnnouncementHttpApi {

  @PostMapping("/clubs/{club-id}/announcements")
  @HasRole(Role.MEMBER)
  @Operation(summary = "클럽 공고 생성", operationId = "createAnnouncement")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "Created",
            content =
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = AnnouncementCreateResponse.class)),
            headers = {@Header(name = "Location", description = "생성된 리소스의 상세정보 조회 URI")}),
        @ApiResponse(
            responseCode = "400",
            description = "Bad Request",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 클럽입니다.",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<AnnouncementCreateResponse> create(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable("club-id") String clubId,
      @Valid @RequestBody AnnouncementCreateRequest body);

  @GetMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 목록 조회")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 클럽입니다.",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(
      @PathVariable("club-id") String clubId);

  @GetMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 상세 조회")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 공고입니다.",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId);

  @PutMapping("/clubs/{club-id}/announcements/{announcement-id}")
  @HasRole(Role.MEMBER)
  @Operation(summary = "공고 수정", operationId = "updateAnnouncement")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(
            responseCode = "400",
            description = "Bad Request",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
        @ApiResponse(
            responseCode = "404",
            description = "존재하지 않는 클럽 또는 공고입니다.",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<AnnouncementUpdateResponse> updateAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId,
      @Valid @RequestBody AnnouncementUpdateRequest body);

  @Operation(summary = "지원폼 조회")
  @GetMapping("/announcements/{announcement-id}/application-form")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(
            responseCode = "404",
            description = "announcement Not found",
            content = @Content(schema = @Schema(hidden = true)))
      })
  ResponseEntity<ApplicationFormResponse> getApplicationForm(
      @PathVariable("announcement-id") String announcementId);
}
