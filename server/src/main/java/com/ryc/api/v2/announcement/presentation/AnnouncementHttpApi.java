package com.ryc.api.v2.announcement.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementUpdateResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RequestMapping("/api/v2")
public interface AnnouncementHttpApi {

  /** todo @HasAnyRoleScured */
  @PostMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 생성")
  @ApiResponses(
      value = {
        @ApiResponse(
            responseCode = "201",
            description = "Created",
            content =
                @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = AnnouncementCreateResponse.class)),
            headers = {@Header(name = "Location", description = "생성된 리소스의 상세정보 조회 URI")})
      })
  public ResponseEntity<AnnouncementCreateResponse> create(
      @PathVariable("club-id") String clubId, @Valid @RequestBody AnnouncementCreateRequest body);

  @GetMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 목록 조회")
  public ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(
      @PathVariable("club-id") String clubId);

  @GetMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 상세 조회")
  public ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId);

  /** 공고 수정 todo hasAnyRole 어노테이션 구현 후 추가 */
  @PutMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 수정")
  public ResponseEntity<AnnouncementUpdateResponse> updateAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId,
      @Valid @RequestBody AnnouncementUpdateRequest body);
}
