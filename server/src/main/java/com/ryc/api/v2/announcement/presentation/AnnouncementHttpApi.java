package com.ryc.api.v2.announcement.presentation;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.announcement.service.AnnouncementService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/announcement")
@RequiredArgsConstructor
@Tag(name = "공고")
public class AnnouncementHttpApi {
  private final AnnouncementService announcementService;

  /** todo @HasAnyRoleScured */
  @Tag(name = "공고")
  @PostMapping("/create")
  @Operation(summary = "클럽 공고 생성")
  public ResponseEntity<AnnouncementCreateResponse> create(
      @Valid @RequestBody AnnouncementCreateRequest body) {
    AnnouncementCreateResponse response = announcementService.createAnnouncement(body);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @Tag(name = "공고")
  @GetMapping("/club/{clubId}")
  @Operation(summary = "클럽 공고 목록 조회")
  public ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(
      @PathVariable("clubId") String clubId) {
    /** todo club 조회 */
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findAllByClubId(clubId));
  }

  @Tag(name = "공고")
  @GetMapping("/{announcementId}")
  @Operation(summary = "클럽 공고 상세 조회")
  public ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      @PathVariable("announcementId") String announcementId) {
    /** todo club 조회 */
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findById(announcementId));
  }
}
