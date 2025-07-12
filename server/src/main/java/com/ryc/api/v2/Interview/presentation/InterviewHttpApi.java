package com.ryc.api.v2.Interview.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v2.Interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewReservationResponse;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewSlotGetAllResponse;
import com.ryc.api.v2.Interview.service.InterviewService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/")
@RequiredArgsConstructor
@Tag(name = "면접")
public class InterviewHttpApi {

  private final InterviewService interviewService;

  @GetMapping("clubs/{club-id}/announcements/{announcement-id}/interview-slots")
  public ResponseEntity<InterviewSlotGetAllResponse> getInterviewSlots(
      @PathVariable("club-id") String clubId,
      @PathVariable("announcement-id") String announcementId,
      @RequestParam("applicant-id") String applicantId) {
    InterviewSlotGetAllResponse response =
        interviewService.getInterviewSlots(clubId, announcementId, applicantId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("interview-slots/{interview-slot-id}/reservations}")
  public ResponseEntity<InterviewReservationResponse> reservationInterview(
      @PathVariable("interview-slot-id") String slotId,
      @RequestBody InterviewReservationRequest body) {
    InterviewReservationResponse response = interviewService.reservationInterview(slotId, body);
//    return ResponseEntity.ok(response);
    return null;
  }
}
