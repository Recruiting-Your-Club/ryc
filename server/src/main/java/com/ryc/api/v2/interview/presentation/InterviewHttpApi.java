package com.ryc.api.v2.interview.presentation;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantSummaryResponse;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationUpdatedRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewSlotCreateRequest;
import com.ryc.api.v2.interview.presentation.dto.response.*;
import com.ryc.api.v2.interview.service.InterviewService;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/")
@RequiredArgsConstructor
@Validated
@Tag(name = "면접")
public class InterviewHttpApi {

  private final InterviewService interviewService;

  @GetMapping("admin/announcements/{announcement-id}/interview-slots")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 관리자가 면접 시간대 조회", description = "동아리 관리자가 특정 공고에 대한 모든 면접 시간대를 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<InterviewSlotResponse>> getInterviewSlotsForAdmin(
      @PathVariable("announcement-id")
          @NotBlank(message = "공고 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "공고 id는 UUID 포멧을 준수하여야 합니다.")
          String announcementId) {
    List<InterviewSlotResponse> responses = interviewService.getInterviewSlots(announcementId);
    return ResponseEntity.ok(responses);
  }

  @GetMapping("clubs/{club-id}/announcements/{announcement-id}/interview-slots")
  @Operation(summary = "지원자가 면접 시간대 조회", description = "지원자가 특정 공고에 대한 모든 면접 시간대를 조회합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<InterviewSlotsApplicantViewResponse> getInterviewSlotsForApplicant(
      @PathVariable("club-id")
          @NotBlank(message = "동아리 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "동아리 id는 UUID 포멧을 준수하여야 합니다.")
          String clubId,
      @PathVariable("announcement-id")
          @NotBlank(message = "공고 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "공고 id는 UUID 포멧을 준수하여야 합니다.")
          String announcementId,
      @RequestParam("applicant-id")
          @NotBlank(message = "지원자 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "지원자 id는 UUID 포멧을 준수하여야 합니다.")
          String applicantId) {
    InterviewSlotsApplicantViewResponse response =
        interviewService.getInterviewSlotsApplicantView(clubId, announcementId, applicantId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("interview-slots/{interview-slot-id}/people/count")
  @Operation(summary = "면접 슬롯의 예약 인원 수 조회", description = "특정 면접 슬롯에 대해 예약된 인원 수를 조회합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<InterviewSlotPeopleCountResponse> getCountByInterviewSlot(
      @PathVariable("interview-slot-id")
          @NotBlank(message = "인터뷰 슬롯 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "인터뷰 슬롯 id는 UUID 포멧을 준수하여야 합니다.")
          String interviewSlotId) {
    InterviewSlotPeopleCountResponse response =
        interviewService.getCountByInterviewSlot(interviewSlotId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("admin/interview-slots/{interview-slot-id}/reservations")
  @HasRole(Role.MEMBER)
  @Operation(
      summary = "동아리 관리자가 면접 예약자들 조회",
      description = "동아리 관리자가 특정 면접 슬롯에 대한 면접자들의 예약 정보를 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, CommonErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER", "RESOURCE_NOT_FOUND"})
  public ResponseEntity<List<InterviewReservationGetResponse>> getInterviewReservationsForAdmin(
      @PathVariable("interview-slot-id")
          @NotBlank(message = "인터뷰 슬롯 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "인터뷰 슬롯 id는 UUID 포멧을 준수하여야 합니다.")
          String interviewSlotId) {
    List<InterviewReservationGetResponse> response =
        interviewService.getInterviewReservations(interviewSlotId);
    return ResponseEntity.ok(response);
  }

  @GetMapping("admin/announcements/{announcement-id}/interviews/unreserved-applicants")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 관리자가 면접 미예약자들 조회", description = "동아리 관리자가 면접을 예약하지 않은 지원자들을 조회합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER"})
  public ResponseEntity<List<ApplicantSummaryResponse>> getInterviewUnReservationsForAdmin(
      @PathVariable("announcement-id")
          @NotBlank(message = "공고 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "공고 id는 UUID 포멧을 준수하여야 합니다.")
          String announcementId) {
    List<ApplicantSummaryResponse> response =
        interviewService.getInterviewUnReservations(announcementId);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/admin/announcements/{announcementId}/interview-slots")
  @HasRole(Role.MEMBER)
  @Operation(summary = "동아리 관리자가 면접 일정 생성", description = "동아리 관리자가 면접 일정을 생성합니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, CommonErrorCode.class, InterviewErrorCode.class},
      include = {
        "FORBIDDEN_NOT_CLUB_MEMBER",
        "INVALID_PARAMETER",
        "INTERVIEW_SLOT_PERIOD_INVALID",
        "INTERVIEW_SLOT_ALREADY_EXISTS"
      })
  public ResponseEntity<List<InterviewSlotResponse>> createInterviewSlots(
      @AuthenticationPrincipal CustomUserDetail userDetail,
      @PathVariable
          @NotBlank(message = "공고 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "공고 id는 UUID 포멧을 준수하여야 합니다.")
          String announcementId,
      @Valid @RequestBody List<InterviewSlotCreateRequest> body) {
    List<InterviewSlotResponse> responses =
        interviewService.createInterviewSlots(userDetail.getId(), announcementId, body);
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(responses);
  }

  @PostMapping("interview-slots/{interview-slot-id}/reservations")
  @Operation(
      summary = "지원자가 면접 예약",
      description = "지원자가 특정 면접 슬롯에 대해 면접을 예약합니다.<br>성공적으로 예약되면, 해당 지원자에게 이메일을 발송합니다.")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class, InterviewErrorCode.class},
      include = {
        "INVALID_PARAMETER",
        "RESOURCE_NOT_FOUND",
        "INTERVIEW_SLOT_FULL",
        "APPLICANT_ALREADY_RESERVED"
      })
  public ResponseEntity<InterviewReservationCreateResponse> reservationInterview(
      @PathVariable("interview-slot-id")
          @NotBlank(message = "인터뷰 슬롯 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "인터뷰 슬롯 id는 UUID 포멧을 준수하여야 합니다.")
          String slotId,
      @Valid @RequestBody InterviewReservationRequest body) {

    InterviewReservationCreateResponse response =
        interviewService.reservationInterview(slotId, body);
    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/v2/reservations/{reservation-id}")
            .buildAndExpand(response.interviewReservationId())
            .toUri();
    return ResponseEntity.created(location).body(response);
  }

  @PutMapping("admin/applicants/{applicant-id}/interview-reservation")
  @HasRole(Role.MEMBER)
  @Operation(
      summary = "동아리 관리자가 면접 예약 정보 수정",
      description =
          "동아리 관리자가 지원자의 면접 일정을 등록 또는 수정합니다.<br>만약 변경하려는 면접 슬롯이 이미 꽉 차있더라도, 해당 면접 예약을 수정할 수 있습니다.")
  @ApiErrorCodeExample(
      value = {PermissionErrorCode.class, CommonErrorCode.class, InterviewErrorCode.class},
      include = {"FORBIDDEN_NOT_CLUB_MEMBER", "RESOURCE_NOT_FOUND", "APPLICANT_ALREADY_RESERVED"})
  public ResponseEntity<InterviewReservationUpdateResponse> changeInterviewReservation(
      @PathVariable("applicant-id")
          @NotBlank(message = "지원자 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "지원자 id는 UUID 포멧을 준수하여야 합니다.")
          String applicantId,
      @Valid @RequestBody InterviewReservationUpdatedRequest body) {
    InterviewReservationUpdateResponse response =
        interviewService.changeInterviewReservation(applicantId, body);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("admin/interview-reservations/{reservation-id}")
  @HasRole(Role.MEMBER)
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  @Operation(summary = "동아리 관리자가 면접 예약자를 미지정자로 변경", description = "동아리 관리자가 면접 예약자를 미지정자로 변경합니다.")
  public ResponseEntity<Void> deleteInterviewReservation(
      @PathVariable("reservation-id")
          @NotBlank(message = "면접 예약 아이디는 빈 값일 수 없습니다.")
          @UUID(message = "면접 예약 id는 UUID 포멧을 준수하여야 합니다.")
          String reservationId) {
    interviewService.deleteInterviewReservation(reservationId);
    return ResponseEntity.noContent().build();
  }
}
