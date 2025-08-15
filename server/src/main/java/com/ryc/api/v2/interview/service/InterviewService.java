package com.ryc.api.v2.interview.service;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.presentation.dto.response.PeriodResponse;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.interview.domain.InterviewRepository;
import com.ryc.api.v2.interview.domain.InterviewReservation;
import com.ryc.api.v2.interview.domain.InterviewSlot;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationUpdatedRequest;
import com.ryc.api.v2.interview.presentation.dto.request.NumberOfPeopleByInterviewDateRequest;
import com.ryc.api.v2.interview.presentation.dto.response.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewService {

  private final InterviewRepository interviewRepository;
  private final ClubRepository clubRepository;
  private final ApplicantRepository applicantRepository;
  private final FileService fileService;

  @Transactional
  public List<String> createInterviewSlot(
      String adminId, String announcementId, List<NumberOfPeopleByInterviewDateRequest> requests) {

    List<InterviewSlot> interviewSlots =
        requests.stream()
            .map(
                request ->
                    InterviewSlot.initialize(
                        adminId,
                        announcementId,
                        request.numberOfPeople(),
                        request.interviewPeriod()))
            .toList();

    List<InterviewSlot> savedInterviewSlots =
        interviewRepository.saveAllInterviewSlot(interviewSlots);
    return savedInterviewSlots.stream().map(InterviewSlot::getId).toList();
  }

  @Transactional(readOnly = true)
  public List<InterviewSlotGetResponse> getInterviewSlots(String announcementId) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementId(announcementId);

    return interviewSlots.stream()
        .map(this::createInterviewSlotResponse)
        .sorted(Comparator.comparing(slot -> slot.period().startDate()))
        .toList();
  }

  @Transactional(readOnly = true)
  public InterviewSlotsApplicantViewResponse getInterviewSlotsForApplicant(
      String clubId, String announcementId, String applicantId) {

    Club club = clubRepository.findById(clubId);
    String applicantEmail = applicantRepository.findEmailById(applicantId);
    List<InterviewSlotGetResponse> slotResponses = getInterviewSlots(announcementId);
    FileGetResponse representativeImage =
        fileService.findAllByAssociatedId(clubId).stream()
            .filter(fileMetaData -> fileMetaData.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(
                fileMetaData ->
                    FileGetResponse.of(fileMetaData, fileService.getPublicFileGetUrl(fileMetaData)))
            .orElse(null);

    return InterviewSlotsApplicantViewResponse.builder()
        .clubName(club.getName())
        .clubCategory(club.getCategory().toString())
        .interviewSlots(slotResponses)
        .representativeImage(representativeImage)
        .applicantEmail(applicantEmail)
        .build();
  }

  /*
   * 관리자가 특정 면접 슬롯에 대한 예약 정보를 조회합니다.
   * 이 메서드는 면접 슬롯 ID를 기준으로 해당 면접 슬롯의 예약 정보를 조회하고,
   * 면접 예약이 없는 지원자 목록을 생성하여 응답합니다.
   */
  @Transactional(readOnly = true)
  public InterviewReservationAdminViewResponse getInterviewReservationsForAdmin(
      String announcementId, String interviewSlotId) {
    InterviewSlot targetInterviewSlot =
        interviewRepository.findInterviewSlotByIdForUpdate(interviewSlotId);
    List<InterviewReservation> reservations = targetInterviewSlot.getInterviewReservations();

    // 면접 예약 정보를 담을 응답 리스트 생성
    List<InterviewReservationGetResponse> reservationResponses =
        reservations.stream().map(this::createReservationResponse).toList();

    List<InterviewSlot> allInterviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementId(announcementId);
    List<Applicant> allApplicants = applicantRepository.findAllByAnnouncementId(announcementId);

    // 면접 예약이 없는 지원자 목록을 생성
    List<UnReservedApplicantGetResponse> unReservedApplicantGetResponses =
        createUnReservedApplicantResponse(allInterviewSlots, allApplicants);

    return InterviewReservationAdminViewResponse.builder()
        .interviewSlotId(interviewSlotId)
        .interviewReservations(reservationResponses)
        .unReservedApplicants(unReservedApplicantGetResponses)
        .build();
  }

  @Transactional
  public InterviewReservationCreateResponse reservationInterview(
      String slotId, InterviewReservationRequest body) {

    // 요청된 면접 일정을 가져옵니다.
    InterviewSlot interviewSlot = interviewRepository.findInterviewSlotByIdForUpdate(slotId);

    // 지원자의 예약 정보를 생성합니다.
    Applicant applicant = applicantRepository.findById(body.applicantId());
    InterviewReservation reservation = InterviewReservation.initialize(applicant);

    // 새로운 예약 정보를 저장합니다.
    InterviewSlot updatedInterviewSlot = interviewSlot.addInterviewReservations(reservation, false);
    InterviewSlot savedInterviewSlot = interviewRepository.saveInterviewSlot(updatedInterviewSlot);

    for (InterviewReservation r : savedInterviewSlot.getInterviewReservations()) {
      if (r.getApplicant().getId().equals(applicant.getId())) {
        return new InterviewReservationCreateResponse(r.getId());
      }
    }

    throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_FULL);
  }

  @Transactional
  public InterviewReservationUpdateResponse changeInterviewReservation(
      String reservationId, InterviewReservationUpdatedRequest body) {
    // 기존 면접 슬롯과 예약 정보 조회
    InterviewSlot oldInterviewSlot =
        interviewRepository.findInterviewSlotByReservationId(reservationId);
    InterviewReservation reservation = oldInterviewSlot.getInterviewReservationById(reservationId);

    // 기존 면접 슬롯에서 예약 정보 제거
    InterviewSlot removedInterviewReservation =
        oldInterviewSlot.removeInterviewReservationById(reservation);

    // 새로운 면접 슬롯에 예약 정보 추가
    InterviewSlot newInterviewSlot =
        interviewRepository.findInterviewSlotByIdForUpdate(body.interviewSlotId());
    InterviewSlot updatedInterviewSlot =
        newInterviewSlot.addInterviewReservations(reservation, true);

    interviewRepository.saveInterviewSlot(removedInterviewReservation);
    interviewRepository.saveInterviewSlot(updatedInterviewSlot);

    InterviewSlotGetResponse slotGetResponse = createInterviewSlotResponse(updatedInterviewSlot);
    return InterviewReservationUpdateResponse.builder()
        .interviewReservationId(reservation.getId())
        .interviewSlot(slotGetResponse)
        .build();
  }

  private InterviewSlotGetResponse createInterviewSlotResponse(InterviewSlot slot) {
    PeriodResponse periodResponse = PeriodResponse.from(slot.getPeriod());
    int size = slot.getInterviewReservations().size();

    return InterviewSlotGetResponse.builder()
        .id(slot.getId())
        .period(periodResponse)
        .maxNumberOfPeople(slot.getMaxNumberOfPeople())
        .currentNumberOfPeople(size)
        .build();
  }

  private InterviewReservationGetResponse createReservationResponse(
      InterviewReservation reservation) {
    Applicant applicant = reservation.getApplicant();

    return InterviewReservationGetResponse.builder()
        .interviewReservationId(reservation.getId())
        .applicantId(applicant.getId())
        .applicantEmail(applicant.getEmail())
        .applicantName(applicant.getName())
        .build();
  }

  /*
   * 모든 면접 슬롯과 모든 지원자를 기반으로 면접 예약이 없는 지원자 목록을 생성합니다.
   * 이 메서드는 모든 면접 슬롯과 지원자를 조회하여
   * 면접 예약이 없는 지원자들을 필터링하여 응답을 생성합니다
   */
  private List<UnReservedApplicantGetResponse> createUnReservedApplicantResponse(
      List<InterviewSlot> allInterviewSlots, List<Applicant> allApplicants) {

    Set<String> reservedApplicantIds = new HashSet<>();

    for (InterviewSlot interviewSlot : allInterviewSlots) {
      for (InterviewReservation reservation : interviewSlot.getInterviewReservations()) {
        reservedApplicantIds.add(reservation.getApplicant().getId());
      }
    }

    return allApplicants.stream()
        .filter(applicant -> !reservedApplicantIds.contains(applicant.getId()))
        .map(
            applicant ->
                UnReservedApplicantGetResponse.builder()
                    .applicantId(applicant.getId())
                    .applicantName(applicant.getName())
                    .applicantEmail(applicant.getEmail())
                    .build())
        .toList();
  }
}
