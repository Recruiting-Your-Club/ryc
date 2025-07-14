package com.ryc.api.v2.Interview.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.Interview.domain.InterviewRepository;
import com.ryc.api.v2.Interview.domain.InterviewReservation;
import com.ryc.api.v2.Interview.domain.InterviewSlot;
import com.ryc.api.v2.Interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.Interview.presentation.dto.request.NumberOfPeopleByInterviewDateRequest;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewInfoGetResponse;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewReservationCreateResponse;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewSlotGetResponse;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewSlotsGetResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.PeriodResponse;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;
import com.ryc.api.v2.role.domain.enums.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewService {

  private final InterviewRepository interviewRepository;
  private final ClubService clubService;
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
  @HasRole(Role.MEMBER)
  public InterviewInfoGetResponse getInterviewInfo(
      ClubRoleSecuredDto clubRoleSecuredDto, String announcementId, LocalDate interviewDate) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementIdAndDate(
            announcementId, interviewDate);

    //    for (InterviewSlot slot : interviewSlots) {
    //      interviewRepository.find
    //    }
    return null;
  }

  @Transactional(readOnly = true)
  public InterviewSlotsGetResponse getInterviewSlots(
      String clubId, String announcementId, String applicantId) {

    Club club = clubService.getClubById(clubId);
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotsByAnnouncementId(announcementId);
    String applicantEmail = applicantRepository.findEmailById(applicantId);

    List<InterviewSlotGetResponse> slotResponses =
        interviewSlots.stream()
            .map(
                slot -> {
                  PeriodResponse periodResponse = PeriodResponse.from(slot.getPeriod());
                  Integer currentCount =
                      interviewRepository.countInterviewReservationBySlotId(
                          slot.getId()); // TODO: 성능 개선 필요

                  return InterviewSlotGetResponse.builder()
                      .id(slot.getId())
                      .period(periodResponse)
                      .maxNumberOfPeople(slot.getMaxNumberOfPeople())
                      .currentNumberOfPeople(currentCount)
                      .build();
                })
            .toList();

    return InterviewSlotsGetResponse.builder()
        .clubName(club.name())
        .clubCategory(club.category().toString())
        .clubImageUrl(club.imageUrl())
        .clubThumbnailUrl(club.thumbnailUrl())
        .interviewSlots(slotResponses)
        .applicantEmail(applicantEmail)
        .build();
  }

  @Transactional
  public InterviewReservationCreateResponse reservationInterview(
      String slotId, InterviewReservationRequest body) {

    InterviewSlot interviewSlot = interviewRepository.findInterviewSlotByIdForUpdate(slotId);
    Integer currentNumberOfPeople =
        interviewRepository.countInterviewReservationBySlotId(interviewSlot.getId());

    // 예약 가능한 인원 수를 초과하는지 확인
    if (interviewSlot.getMaxNumberOfPeople() <= currentNumberOfPeople) {
      throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_FULL);
    }

    Applicant applicant = applicantRepository.findById(body.applicantId());
    InterviewReservation reservation =
        InterviewReservation.initialize(applicant, interviewSlot.getId());

    InterviewReservation savedReservation =
        interviewRepository.saveInterviewReservation(reservation);
    return new InterviewReservationCreateResponse(savedReservation.getId());
  }
}
