package com.ryc.api.v2.Interview.presentation;

import java.net.URI;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
  @Operation(summary = "면접 시간대 조회", description = "특정 동아리의 공고에 대한 면접 시간대를 조회합니다.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "면접 시간대 조회 성공"),
      @ApiResponse(responseCode = "404", description = "동아리 또는 공고를 찾을 수 없음",
          content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<InterviewSlotGetAllResponse> getInterviewSlots(
      @PathVariable("club-id") String clubId,
      @PathVariable("announcement-id") String announcementId,
      @RequestParam("applicant-id") String applicantId) {
    InterviewSlotGetAllResponse response =
        interviewService.getInterviewSlots(clubId, announcementId, applicantId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("interview-slots/{interview-slot-id}/reservations")
  @Operation(
      summary = "면접 예약",
      description = "지원자가 특정 면접 슬롯에 대해 면접을 예약합니다.")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "면접 예약 성공"),
      @ApiResponse(responseCode = "400", description = "이미 예약된 면접 슬롯",
          content = @Content(schema = @Schema(hidden = true))),
      @ApiResponse(responseCode = "404", description = "면접 슬롯을 찾을 수 없음",
          content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<InterviewReservationResponse> reservationInterview(
      @PathVariable("interview-slot-id") String slotId,
      @RequestBody InterviewReservationRequest body) {
    InterviewReservationResponse response = interviewService.reservationInterview(slotId, body);
    URI location = URI.create(String.format("api/v2/reservations/%s", response.id()));
    return ResponseEntity.created(location).body(response);
  }
}
