package com.ryc.api.v2.announcement.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.*;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.announcement.service.ApplicationFormService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AnnouncementHttpApiImpl implements AnnouncementHttpApi {
  private final AnnouncementService announcementService;
  private final ApplicationFormService applicationFormService;

  @Override
  public ResponseEntity<AnnouncementCreateResponse> create(
      String clubId, AnnouncementCreateRequest body) {
    AnnouncementCreateResponse response = announcementService.createAnnouncement(clubId, body);

    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/v2/announcements/{announcement-id}")
            .buildAndExpand(response.announcementId())
            .toUri();

    return ResponseEntity.created(location).body(response);
  }

  @Override
  public ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(String clubId) {
    /** todo club 조회 */
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findAllByClubId(clubId));
  }

  @Override
  public ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      String announcementId) {
    /** todo club 조회 */
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findById(announcementId));
  }

  @Override
  public ResponseEntity<AnnouncementUpdateResponse> updateAnnouncementDetail(
      String announcementId, AnnouncementUpdateRequest body) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(announcementService.updateAnnouncement(body, announcementId));
  }

  @Override
  public ResponseEntity<ApplicationFormResponse> getApplicationForm(String announcementId) {
    return ResponseEntity.status(HttpStatus.OK)
        .body(applicationFormService.getApplicationFormByAnnouncementId(announcementId));
  }
}
