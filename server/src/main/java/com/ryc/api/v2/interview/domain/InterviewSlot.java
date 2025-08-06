package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;
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
      PeriodRequest periodRequest) {

    Period period = Period.from(periodRequest);
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
      }

      // 예약이 꽉 찼고, 추가 예약을 허용하지 않는 경우 예외 발생
      throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_FULL);
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

  public InterviewSlot removeInterviewReservationById(InterviewReservation reservation) {
    List<InterviewReservation> newInterviewReservations =
        new ArrayList<>(this.interviewReservations);
    newInterviewReservations.remove(reservation);

    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .period(this.period)
        .interviewReservations(List.copyOf(newInterviewReservations))
        .build();
  }

  public InterviewReservation getInterviewReservationById(String reservationId) {
    return this.interviewReservations.stream()
        .filter(reservation -> reservation.getId().equals(reservationId))
        .findFirst()
        .orElseThrow(() -> new EntityNotFoundException("Interview slot not found"));
  }

  // Getter 어노테이션이 생성하는 Get 메서드보다 직접 작성한 Get 메서드가 우선시 됨.
  public List<InterviewReservation> getInterviewReservations() {
    return List.copyOf(interviewReservations);
  }
}
