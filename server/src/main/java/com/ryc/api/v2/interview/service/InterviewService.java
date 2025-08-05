package com.ryc.api.v2.interview.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.presentation.dto.response.PeriodResponse;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
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
        interviewRepository.saveAllInterviewSLot(interviewSlots);
    return savedInterviewSlots.stream().map(InterviewSlot::getId).toList();
  }

  @Transactional(readOnly = true)
  public InterviewSlotsApplicantViewResponse getInterviewSlotsForApplicant(
      String clubId, String announcementId, String applicantId) {

    Club club = clubRepository.findById(clubId);
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementId(announcementId);
    String applicantEmail = applicantRepository.findEmailById(applicantId);

    List<InterviewSlotGetResponse> slotResponses =
        interviewSlots.stream()
            .map(
                slot -> {
                  PeriodResponse periodResponse = PeriodResponse.from(slot.getPeriod());
                  int size = slot.getInterviewReservations().size();

                  return InterviewSlotGetResponse.builder()
                      .id(slot.getId())
                      .period(periodResponse)
                      .maxNumberOfPeople(slot.getMaxNumberOfPeople())
                      .currentNumberOfPeople(size)
                      .build();
                })
            .toList();

    return InterviewSlotsApplicantViewResponse.builder()
        .clubName(club.getName())
        .clubCategory(club.getCategory().toString())
        .clubImageUrl(club.getImageUrl())
        .clubThumbnailUrl(club.getThumbnailUrl())
        .interviewSlots(slotResponses)
        .applicantEmail(applicantEmail)
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
    interviewRepository.saveInterviewSlot(updatedInterviewSlot);

    InterviewReservation savedReservation =
        interviewRepository.saveInterviewReservation(reservation, interviewSlot);
    return new InterviewReservationCreateResponse(savedReservation.getId());
  }

  /*
   * 한 날짜에 해당하는 면접 슬롯과 면접 예약 목록을 조회
   */
  @Transactional(readOnly = true)
  public List<InterviewInfoGetResponse> getInterviewInfo(
      /*


      면접 미지정자에 대한 응답 값도 추가하기



       */
      String announcementId, LocalDate interviewDate) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementIdAndDate(
            announcementId, interviewDate);
    List<InterviewInfoGetResponse> responses = new ArrayList<>(); // 최종 반환할 응답 리스트

    for (InterviewSlot slot : interviewSlots) {
      List<InterviewReservation> reservations = slot.getInterviewReservations();

      // 면접 슬롯 정보를 담을 응답 객체
      InterviewSlotGetResponse slotResponse =
          InterviewSlotGetResponse.builder()
              .id(slot.getId())
              .period(PeriodResponse.from(slot.getPeriod()))
              .maxNumberOfPeople(slot.getMaxNumberOfPeople())
              .currentNumberOfPeople(reservations.size())
              .build();

      // 면접 예약 정보를 담을 응답 리스트
      List<InterviewReservationGetResponse> reservationResponses = new ArrayList<>();

      for (InterviewReservation reservation : reservations) {
        Applicant applicant = reservation.getApplicant();

        // 면접 예약 정보를 담을 응답 객체
        InterviewReservationGetResponse reservationResponse =
            InterviewReservationGetResponse.builder()
                .interviewReservationId(reservation.getId())
                .applicantId(applicant.getId())
                .applicantEmail(applicant.getEmail())
                .applicantName(applicant.getName())
                .build();

        reservationResponses.add(reservationResponse);
      }

      // 최종 응답 객체 생성
      InterviewInfoGetResponse response =
          InterviewInfoGetResponse.builder()
              .interviewSlotGetResponse(slotResponse)
              .interviewReservations(reservationResponses)
              .build();

      responses.add(response);
    }

    return responses;
  }

  @Transactional
  public InterviewReservationUpdateResponse changeInterviewReservation(
      String reservationId, InterviewReservationUpdatedRequest body) {
    // 기존 면접 슬롯 조회
    InterviewSlot oldInterviewSlot =
        interviewRepository.findInterviewSlotByReservationId(reservationId);

    // 기존 면접 슬롯에서 예약 정보 조회
    InterviewReservation reservation = oldInterviewSlot.getInterviewReservationById(reservationId);

    // 기존 면접 슬롯에서 예약 정보 제거
    InterviewSlot removedInterviewReservation =
        oldInterviewSlot.removeInterviewReservationById(reservation);
    interviewRepository.saveInterviewSlot(removedInterviewReservation);

    // 새로운 면접 슬롯 조회
    InterviewSlot newInterviewSlot =
        interviewRepository.findInterviewSlotByIdForUpdate(body.interviewSlotId());

    // 새로운 면접 슬롯에 예약 정보 추가
    InterviewSlot updatedInterviewSlot =
        newInterviewSlot.addInterviewReservations(reservation, true);
    InterviewReservation savedReservation =
        interviewRepository.saveInterviewReservation(reservation, updatedInterviewSlot);

    PeriodResponse periodResponse = PeriodResponse.from(newInterviewSlot.getPeriod());
    InterviewSlotGetResponse slotGetResponse =
        InterviewSlotGetResponse.builder()
            .id(newInterviewSlot.getId())
            .period(periodResponse)
            .maxNumberOfPeople(newInterviewSlot.getMaxNumberOfPeople())
            .currentNumberOfPeople(newInterviewSlot.getInterviewReservations().size())
            .build();

    return InterviewReservationUpdateResponse.builder()
        .interviewReservationId(savedReservation.getId())
        .interviewSlot(slotGetResponse)
        .build();
  }
}
