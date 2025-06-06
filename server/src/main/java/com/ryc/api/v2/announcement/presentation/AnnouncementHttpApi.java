package com.ryc.api.v2.announcement.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementUpdateResponse;
import com.ryc.api.v2.announcement.service.AnnouncementService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2")
@RequiredArgsConstructor
@Tag(name = "공고")
public class AnnouncementHttpApi {
  private final AnnouncementService announcementService;

  /** todo @HasAnyRoleScured */
  @PostMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 생성")
  public ResponseEntity<AnnouncementCreateResponse> create(
      @PathVariable("club-id") String clubId, @Valid @RequestBody AnnouncementCreateRequest body) {
    AnnouncementCreateResponse response = announcementService.createAnnouncement(clubId, body);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping("/clubs/{club-id}/announcements")
  @Operation(summary = "클럽 공고 목록 조회")
  public ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(
      @PathVariable("club-id") String clubId) {
    /** todo club 조회 */
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findAllByClubId(clubId));
  }

  @GetMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 상세 조회")
  public ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId) {
    /** todo club 조회 */
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findById(announcementId));
  }

  /** 공고 수정 todo hasAnyRole 어노테이션 구현 후 추가 */
  @PutMapping("/announcements/{announcement-id}")
  @Operation(summary = "공고 수정")
  public ResponseEntity<AnnouncementUpdateResponse> updateAnnouncementDetail(
      @PathVariable("announcement-id") String announcementId,
      @Valid @RequestBody AnnouncementUpdateRequest body) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(announcementService.updateAnnouncement(body, announcementId));
  }
}
