package com.ryc.api.v2.interview.presentation;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationUpdatedRequest;
import com.ryc.api.v2.interview.presentation.dto.response.InterviewInfoGetResponse;
import com.ryc.api.v2.interview.presentation.dto.response.InterviewReservationCreateResponse;
import com.ryc.api.v2.interview.presentation.dto.response.InterviewReservationUpdateResponse;
import com.ryc.api.v2.interview.presentation.dto.response.InterviewSlotsApplicantViewResponse;
import com.ryc.api.v2.interview.service.InterviewService;
import com.ryc.api.v2.role.domain.enums.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/")
@RequiredArgsConstructor
@Tag(name = "면접")
public class InterviewHttpApi {

  private final InterviewService interviewService;

  @GetMapping("clubs/{club-id}/announcements/{announcement-id}/interview-slots/applicants")
  @Operation(summary = "면접 시간대 조회", description = "지원자가 특정 동아리의 공고에 대한 면접 시간대를 조회합니다.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "면접 시간대 조회 성공"),
    @ApiResponse(
        responseCode = "404",
        description = "동아리 또는 공고를 찾을 수 없음",
        content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<InterviewSlotsApplicantViewResponse> getInterviewSlotsForApplicant(
      @PathVariable("club-id") String clubId,
      @PathVariable("announcement-id") String announcementId,
      @RequestParam("applicant-id") String applicantId) {
    InterviewSlotsApplicantViewResponse response =
        interviewService.getInterviewSlotsForApplicant(clubId, announcementId, applicantId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("interview-slots/{interview-slot-id}/reservations")
  @Operation(summary = "면접 예약", description = "지원자가 특정 면접 슬롯에 대해 면접을 예약합니다.")
  @ApiResponses({
    @ApiResponse(responseCode = "201", description = "면접 예약 성공"),
    @ApiResponse(
        responseCode = "409",
        description = "이미 예약된 면접 슬롯",
        content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(
        responseCode = "404",
        description = "면접 슬롯을 찾을 수 없음",
        content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<InterviewReservationCreateResponse> reservationInterview(
      @PathVariable("interview-slot-id") String slotId,
      @RequestBody InterviewReservationRequest body) {

    InterviewReservationCreateResponse response =
        interviewService.reservationInterview(slotId, body);
    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/v2/reservations/{reservation-id}")
            .buildAndExpand(response.id())
            .toUri();
    return ResponseEntity.created(location).body(response);
  }

  @GetMapping("announcements/{announcement-id}/interview-slots/reservations")
  @HasRole(Role.MEMBER)
  @Operation(summary = "면접 정보 조회", description = "동아리 관리자가 특정 날짜에 대한 면접자들의 정보를 조회합니다.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "면접 정보 조회 성공"),
    @ApiResponse(
        responseCode = "403",
        description = "동아리 회장 또는 동아리원이 아닙니다.",
        content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<List<InterviewInfoGetResponse>> getInterviewInfoForAdmin(
      @PathVariable("announcement-id") String announcementId,
      @Parameter(description = "면접 날짜", example = "2023-10-01", required = true)
          @RequestParam("interview-date")
          LocalDate interviewDate) {
    List<InterviewInfoGetResponse> response =
        interviewService.getInterviewInfo(announcementId, interviewDate);
    return ResponseEntity.ok(response);
  }

  @PatchMapping("interview-reservations/{reservation-id}")
  @HasRole(Role.MEMBER)
  @Operation(
      summary = "면접 예약 수정",
      description =
          "동아리 관리자가 지원자의 면접 일정을 수정합니다.\n 만약 변경하려는 면접 슬롯이 이미 꽉 차있더라도, 해당 면접 예약을 수정할 수 있습니다.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "면접 예약 수정 성공"),
    @ApiResponse(
        responseCode = "403",
        description = "동아리 회장 또는 동아리원이 아닙니다.",
        content = @Content(schema = @Schema(hidden = true))),
    @ApiResponse(
        responseCode = "404",
        description = "면접 슬롯 또는 면접 예약을 찾을 수 없음",
        content = @Content(schema = @Schema(hidden = true)))
  })
  public ResponseEntity<InterviewReservationUpdateResponse> changeInterviewReservation(
      @PathVariable("reservation-id") String reservationId,
      @RequestBody InterviewReservationUpdatedRequest body) {
    InterviewReservationUpdateResponse response =
        interviewService.changeInterviewReservation(reservationId, body);
    return ResponseEntity.ok(response);
  }
}
