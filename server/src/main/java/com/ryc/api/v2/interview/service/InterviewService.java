package com.ryc.api.v2.interview.service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

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
                        request.start(),
                        request.interviewDuration()))
            .toList();

    List<InterviewSlot> savedInterviewSlots =
        interviewRepository.saveAllInterviewSlot(interviewSlots);
    return savedInterviewSlots.stream().map(InterviewSlot::getId).toList();
  }

  @Transactional(readOnly = true)
  public List<InterviewSlotsByDateResponse> getInterviewSlots(String announcementId) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementId(announcementId);

    List<InterviewSlotResponse> slots =
        interviewSlots.stream().map(this::createInterviewSlotResponse).toList();

    return slots.stream()
        .collect(Collectors.groupingBy(slot -> slot.period().startDate().toLocalDate()))
        .entrySet()
        .stream()
        .map(entry -> createInterviewSlotsByDateResponse(entry.getKey(), entry.getValue()))
        .sorted(Comparator.comparing(InterviewSlotsByDateResponse::date))
        .toList();
  }

  @Transactional(readOnly = true)
  public InterviewSlotsApplicantViewResponse getInterviewSlotsApplicantView(
      String clubId, String announcementId, String applicantId) {

    Club club = clubRepository.findById(clubId);
    String applicantEmail = applicantRepository.findEmailById(applicantId);

    List<InterviewSlotsByDateResponse> slotResponses = getInterviewSlots(announcementId);

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
        .slotByDateResponses(slotResponses)
        .representativeImage(representativeImage)
        .applicantEmail(applicantEmail)
        .build();
  }

  @Transactional(readOnly = true)
  public InterviewSlotPeopleCountResponse getCountByInterviewSlot(String interviewSlotId) {
    InterviewSlot slot = interviewRepository.findInterviewSlotById(interviewSlotId);
    return new InterviewSlotPeopleCountResponse(
        slot.getMaxNumberOfPeople(), slot.getInterviewReservations().size());
  }

  @Transactional(readOnly = true)
  public List<InterviewReservationGetResponse> getInterviewReservations(String interviewSlotId) {
    InterviewSlot interviewSlot = interviewRepository.findInterviewSlotById(interviewSlotId);
    List<InterviewReservation> reservations = interviewSlot.getInterviewReservations();
    List<InterviewReservationGetResponse> responses = new ArrayList<>();

    for (InterviewReservation reservation : reservations) {
      Applicant applicant = reservation.getApplicant();

      InterviewReservationGetResponse response =
          InterviewReservationGetResponse.builder()
              .interviewReservationId(reservation.getId())
              .applicantId(applicant.getId())
              .applicantEmail(applicant.getEmail())
              .applicantName(applicant.getName())
              .build();
      responses.add(response);
    }
    return responses;
  }

  @Transactional(readOnly = true)
  public List<UnReservedApplicantGetResponse> getUnReservedApplicants(String announcementId) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementId(announcementId);
    Set<Applicant> applicants =
        new HashSet<>(applicantRepository.findAllByAnnouncementId(announcementId));

    Set<String> reservedApplicantIds =
        interviewSlots.stream()
            .flatMap(slot -> slot.getInterviewReservations().stream())
            .map(reservation -> reservation.getApplicant().getId())
            .collect(Collectors.toSet());

    applicants.removeIf(applicant -> reservedApplicantIds.contains(applicant.getId()));

    return applicants.stream()
        .map(
            applicant ->
                UnReservedApplicantGetResponse.builder()
                    .applicantId(applicant.getId())
                    .applicantEmail(applicant.getEmail())
                    .applicantName(applicant.getName())
                    .build())
        .toList();
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
      String applicantId, InterviewReservationUpdatedRequest body) {

    InterviewReservation reservation;

    // 기존 면접 슬롯이 있는지 확인하고, 해당 슬롯에서 지원자의 예약을 제거합니다.
    Optional<InterviewSlot> interviewSlotOptional =
        interviewRepository.findInterviewSlotByApplicantIdForUpdate(applicantId);

    if (interviewSlotOptional.isPresent()) {
      InterviewSlot slot = interviewSlotOptional.get();

      reservation = slot.getInterviewReservationByApplicantId(applicantId);

      InterviewSlot updatedSlot = slot.removeReservation(reservation);
      interviewRepository.saveInterviewSlot(updatedSlot);
    } else {

      Applicant applicant = applicantRepository.findById(applicantId);
      reservation = InterviewReservation.initialize(applicant);
    }

    // 새로운 면접 슬롯에 예약 정보 추가
    InterviewSlot newSlot =
        interviewRepository.findInterviewSlotByIdForUpdate(body.interviewSlotId());
    InterviewSlot updatedSlot = newSlot.addInterviewReservations(reservation, true);

    InterviewSlot savedSlot = interviewRepository.saveInterviewSlot(updatedSlot);
    String reservationId = savedSlot.getInterviewReservationByApplicantId(applicantId).getId();

    InterviewSlotResponse slotGetResponse = createInterviewSlotResponse(savedSlot);
    return InterviewReservationUpdateResponse.builder()
        .interviewReservationId(reservationId)
        .interviewSlot(slotGetResponse)
        .build();
  }

  private InterviewSlotResponse createInterviewSlotResponse(InterviewSlot slot) {
    PeriodResponse periodResponse = PeriodResponse.from(slot.getPeriod());
    int size = slot.getInterviewReservations().size();

    return InterviewSlotResponse.builder()
        .id(slot.getId())
        .period(periodResponse)
        .maxNumberOfPeople(slot.getMaxNumberOfPeople())
        .currentNumberOfPeople(size)
        .build();
  }

  private InterviewSlotsByDateResponse createInterviewSlotsByDateResponse(
      LocalDate date, List<InterviewSlotResponse> slotResponses) {
    PeriodResponse period = slotResponses.get(0).period();
    long interviewDuration = Duration.between(period.startDate(), period.endDate()).toMinutes();

    return InterviewSlotsByDateResponse.builder()
        .date(date)
        .interviewDuration((int) interviewDuration)
        .interviewSlots(slotResponses)
        .build();
  }
}
