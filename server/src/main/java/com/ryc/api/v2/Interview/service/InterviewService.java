package com.ryc.api.v2.Interview.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.Interview.domain.InterviewRepository;
import com.ryc.api.v2.Interview.domain.InterviewSlot;
import com.ryc.api.v2.Interview.presentation.dto.request.NumberOfPeopleByInterviewDateRequest;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewSlotGetAllResponse;
import com.ryc.api.v2.Interview.presentation.dto.response.InterviewSlotGetResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.PeriodResponse;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.service.ClubService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewService {

  private final InterviewRepository interviewRepository;
  private final ClubService clubService;

  @Transactional
  public List<String> createInterviewSlot(
      String adminId,
      String clubId,
      String announcementId,
      List<NumberOfPeopleByInterviewDateRequest> requests) {

    List<InterviewSlot> interviewSlots =
        requests.stream()
            .map(
                request ->
                    InterviewSlot.initialize(
                        adminId,
                        clubId,
                        announcementId,
                        request.numberOfPeople(),
                        request.interviewPeriod()))
            .toList();

    List<InterviewSlot> savedInterviewSlots = interviewRepository.saveAll(interviewSlots);
    return savedInterviewSlots.stream().map(InterviewSlot::getId).toList();
  }

  @Transactional(readOnly = true)
  public InterviewSlotGetAllResponse getInterviewSlots(
      String clubId, String announcementId, String applicantId) {

    Club club = clubService.getClubById(clubId);
    List<InterviewSlot> interviewSlots =
        interviewRepository.findInterviewSlotByAnnouncementId(announcementId);

    List<InterviewSlotGetResponse> slotResponses =
        interviewSlots.stream()
            .map(
                slot -> {
                  PeriodResponse periodResponse = PeriodResponse.from(slot.getPeriod());

                  return InterviewSlotGetResponse.builder()
                      .id(slot.getId())
                      .period(periodResponse)
                      .maxNumberOfPeople(slot.getMaxNumberOfPeople())
                      .currentNumberOfPeople(0) // TODO: 현재 인원 수를 가져오는 로직 추가 필요
                      .build();
                })
            .toList();

    return InterviewSlotGetAllResponse.builder()
        .clubId(club.id())
        .clubName(club.name())
        .clubCategory(club.category().toString())
        .clubImageUrl(club.imageUrl())
        .clubThumbnailUrl(club.thumbnailUrl())
        .interviewSlots(slotResponses)
        .applicantEmail("MOCK EMAIL") // TODO: applicantId를 사용하여 지원자 이메일 가져오기
        .build();
  }
}
