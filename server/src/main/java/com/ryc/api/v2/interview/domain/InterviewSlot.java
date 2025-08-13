package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;
import java.util.*;

import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class InterviewSlot {

  private final String id;
  private final String creatorId;
  private final String announcementId;
  private final Integer maxNumberOfPeople;
  private final Period period;
  private final List<InterviewReservation> interviewReservations;

  public static InterviewSlot initialize(
      String creatorId,
      String announcementId,
      Integer maxNumberOfPeople,
      LocalDateTime start,
      Integer interviewDuration) {

    Period period =
        Period.builder().startDate(start).endDate(start.plusMinutes(interviewDuration)).build();

    return InterviewSlot.builder()
        .id(DEFAULT_INITIAL_ID)
        .creatorId(creatorId)
        .announcementId(announcementId)
        .maxNumberOfPeople(maxNumberOfPeople)
        .period(period)
        .interviewReservations(List.of()) // 초기화 시에는 예약이 없으므로 빈 리스트로 설정
        .build();
  }

  public InterviewSlot addInterviewReservations(
      InterviewReservation newReservation, boolean allowOverMax) {
    int maxCount = this.maxNumberOfPeople;
    List<InterviewReservation> newInterviewReservations =
        new ArrayList<>(this.interviewReservations);

    if (maxNumberOfPeople == interviewReservations.size()) {
      if (allowOverMax) {
        maxCount++;
      } else {
        // 예약이 꽉 찼고, 추가 예약을 허용하지 않는 경우 예외 발생
        throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_FULL);
      }
    }

    newInterviewReservations.add(newReservation);

    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(maxCount)
        .period(this.period)
        .interviewReservations(List.copyOf(newInterviewReservations))
        .build();
  }

  public InterviewSlot removeReservation(InterviewReservation reservation) {
    Set<InterviewReservation> newInterviewReservations = new HashSet<>(this.interviewReservations);
    newInterviewReservations.removeIf(r -> r.getId().equals(reservation.getId()));

    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .period(this.period)
        .interviewReservations(List.copyOf(newInterviewReservations))
        .build();
  }

  // Getter 어노테이션이 생성하는 Get 메서드보다 직접 작성한 Get 메서드가 우선시 됨.
  public List<InterviewReservation> getInterviewReservations() {
    return List.copyOf(interviewReservations);
  }

  public InterviewReservation getInterviewReservationByApplicantId(String applicantId) {
    return interviewReservations.stream()
        .filter(reservation -> reservation.getApplicant().getId().equals(applicantId))
        .findFirst()
        .orElseThrow(
            () ->
                new NoSuchElementException(
                    "Interview reservation not found for applicant: " + applicantId));
  }
}
