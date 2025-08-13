package com.ryc.api.v2.interview.presentation;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationUpdatedRequest;
import com.ryc.api.v2.interview.presentation.dto.response.*;
import com.ryc.api.v2.interview.service.InterviewService;
import com.ryc.api.v2.role.domain.enums.Role;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/")
@RequiredArgsConstructor
@Tag(name = "면접")
public class InterviewHttpApi {

  private final InterviewService interviewService;

  @GetMapping("announcements/{announcement-id}/interview-slots")
  @HasRole(Role.MEMBER)
  @Operation(summary = "면접 시간대 조회", description = "동아리 관리자가 특정 공고에 대한 모든 면접 시간대를 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<InterviewSlotGetResponse>> getInterviewSlotsForAdmin(
      @PathVariable("announcement-id") String announcementId) {
    List<InterviewSlotGetResponse> responses = interviewService.getInterviewSlots(announcementId);
    return ResponseEntity.ok(responses);
  }

  @GetMapping("clubs/{club-id}/announcements/{announcement-id}/interview-slots")
  @Operation(summary = "지원자의 면접 시간대 조회", description = "지원자가 특정 공고에 대한 모든 면접 시간대를 조회합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<InterviewSlotsApplicantViewResponse> getInterviewSlotsForApplicant(
      @PathVariable("club-id") String clubId,
      @PathVariable("announcement-id") String announcementId,
      @RequestParam("applicant-id") String applicantId) {
    InterviewSlotsApplicantViewResponse response =
        interviewService.getInterviewSlotsApplicantView(clubId, announcementId, applicantId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("interview-slots/{interview-slot-id}/reservations")
  @HasRole(Role.MEMBER)
  @Operation(summary = "면접 예약자들 조회", description = "동아리 관리자가 특정 면접 슬롯에 대한 면접자들의 예약 정보를 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, CommonErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER", "RESOURCE_NOT_FOUND"})
  public ResponseEntity<List<InterviewReservationGetResponse>> getInterviewReservationsForAdmin(
      @PathVariable("interview-slot-id") String interviewSlotId) {
    List<InterviewReservationGetResponse> response =
        interviewService.getInterviewReservations(interviewSlotId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("announcements/{announcement-id}/unreserved-applicants")
  @HasRole(Role.MEMBER)
  @Operation(summary = "면접 미예약 지원자 조회", description = "동아리 관리자가 면접을 예약하지 않은 지원자들을 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<UnReservedApplicantGetResponse>> getUnReservedApplicants(
      @PathVariable("announcement-id") String announcementId) {
    List<UnReservedApplicantGetResponse> response =
        interviewService.getUnReservedApplicants(announcementId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("interview-slots/{interview-slot-id}/reservations")
  @Operation(summary = "지원자가 면접 예약", description = "지원자가 특정 면접 슬롯에 대해 면접을 예약합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, InterviewErrorCode.class},
      include = {"INVALID_PARAMETER", "RESOURCE_NOT_FOUND", "INTERVIEW_SLOT_FULL"})
  public ResponseEntity<InterviewReservationCreateResponse> reservationInterview(
      @PathVariable("interview-slot-id") String slotId,
      @Valid @RequestBody InterviewReservationRequest body) {

    InterviewReservationCreateResponse response =
        interviewService.reservationInterview(slotId, body);
    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/v2/reservations/{reservation-id}")
            .buildAndExpand(response.id())
            .toUri();
    return ResponseEntity.created(location).body(response);
  }

  @PatchMapping("interview-reservations/{reservation-id}")
  @HasRole(Role.MEMBER)
  @Operation(
      summary = "면접 예약 수정",
      description =
          "동아리 관리자가 지원자의 면접 일정을 수정합니다.\n 만약 변경하려는 면접 슬롯이 이미 꽉 차있더라도, 해당 면접 예약을 수정할 수 있습니다.")
  @ApiErrorCodeExample(
      value = {
        PermissionErrorCode.class,
        CommonErrorCode.class,
      },
      include = {
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "RESOURCE_NOT_FOUND",
      })
  public ResponseEntity<InterviewReservationUpdateResponse> changeInterviewReservation(
      @PathVariable("reservation-id") String reservationId,
      @Valid @RequestBody InterviewReservationUpdatedRequest body) {
    InterviewReservationUpdateResponse response =
        interviewService.changeInterviewReservation(reservationId, body);
    return ResponseEntity.ok(response);
  }
}
