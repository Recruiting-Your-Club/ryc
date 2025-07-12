package com.ryc.api.v2.Interview.presentation;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.Interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewReservationResponse;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewSlotsGetResponse;
import com.ryc.api.v2.Interview.service.InterviewService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/")
@RequiredArgsConstructor
@Tag(name = "면접")
public class InterviewHttpApi {

  private final InterviewService interviewService;

  @PostMapping("announcements/{announcement-id}/interview-slots/{slot-id}/reservations}")
  public ResponseEntity<InterviewReservationResponse> reservationInterview(
      @PathVariable("announcement-id") String announcementId,
      @PathVariable("slot-id") String slotId,
      @RequestBody InterviewReservationRequest interviewReservationRequest) {
    return null;
  }

  @GetMapping("clubs/{club-id}/announcements/{announcement-id}/interview-slots")
  public ResponseEntity<List<InterviewSlotsGetResponse>> getInterviewSlots(
      @PathVariable("club-id") String clubId,
      @PathVariable("announcement-id") String announcementId,
      @RequestParam("applicant-id") String applicantId) {
    List<InterviewSlotsGetResponse> responses =
        interviewService.getInterviewSlots(clubId, announcementId, applicantId);
    return ResponseEntity.ok(responses);
  }
}
