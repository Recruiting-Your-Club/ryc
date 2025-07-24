package com.ryc.api.v2.announcement.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementUpdateResponse;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;
import com.ryc.api.v2.applicationForm.service.ApplicationFormService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AnnouncementHttpApiImpl implements AnnouncementHttpApi {
  private final AnnouncementService announcementService;
  private final ApplicationFormService applicationFormService;

  @Override
  public ResponseEntity<AnnouncementCreateResponse> create(
      CustomUserDetail userDetail, String clubId, AnnouncementCreateRequest body) {
    AnnouncementCreateResponse response = announcementService.createAnnouncement(clubId, body);

    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/v2/clubs/{club-id}/announcements/{announcement-id}")
            .buildAndExpand(clubId, response.announcementId())
            .toUri();

    return ResponseEntity.created(location).body(response);
  }

  @Override
  public ResponseEntity<List<AnnouncementGetAllResponse>> getAnnouncementsByClubId(String clubId) {
    return ResponseEntity.status(HttpStatus.OK).body(announcementService.findAllByClubId(clubId));
  }

  @Override
  public ResponseEntity<AnnouncementGetDetailResponse> getAnnouncementDetail(
      String announcementId) {
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
