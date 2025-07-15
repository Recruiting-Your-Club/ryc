package com.ryc.api.v2.Interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.util.List;

import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;

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

  public boolean isFull() {
    return interviewReservations.size() >= maxNumberOfPeople;
  }

  // Getter 어노테이션이 생성하는 Get 메서드보다 직접 작성한 Get 메서드가 우선시 됨.
  public List<InterviewReservation> getInterviewReservations() {
    return List.copyOf(interviewReservations);
  }
}
