package com.ryc.api.v2.application.presentation;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationGetResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSummaryResponse;
import com.ryc.api.v2.application.service.ApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ApplicationHttpApiImpl implements ApplicationHttpApi {
  private final ApplicationService applicationService;

  @Override
  public ResponseEntity<ApplicationSubmissionResponse> submitApplication(
      String announcementId, ApplicationSubmissionRequest body) {
    ApplicationSubmissionResponse response =
        applicationService.submitApplication(body, announcementId);

    URI location =
        URI.create(
            String.format(
                "/api/v2/announcements/%s/applications/%s",
                announcementId, response.applicationId()));
    return ResponseEntity.created(location).body(response);
  }

  @Override
  // TODO: @HasRole(Role.MEMBER)
  public ResponseEntity<List<ApplicationSummaryResponse>> getApplicationsByAnnouncementId(
      String announcementId, String status) {
    List<ApplicationSummaryResponse> response =
        applicationService.getApplicationsByAnnouncementId(announcementId, status);
    return ResponseEntity.ok(response);
  }

  @Override
  // TODO:@HasRole(Role.MEMBER)
  public ResponseEntity<ApplicationGetResponse> getApplicationDetail(
      String announcementId, String applicantId) {
    ApplicationGetResponse response =
        applicationService.getApplicationDetail(announcementId, applicantId);
    return ResponseEntity.ok(response);
  }
}
