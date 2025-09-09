package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;
import java.util.*;

import com.ryc.api.v2.common.domain.Period;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;

import lombok.Builder;
import lombok.Getter;

@Getter
public class InterviewSlot {

  private final String id;
  private final String creatorId;
  private final String announcementId;
  private final Integer maxNumberOfPeople;
  private final Period period;
  private final List<InterviewReservation> reservations;

  @Builder
  private InterviewSlot(
      String id,
      String creatorId,
      String announcementId,
      Integer maxNumberOfPeople,
      Period period,
      List<InterviewReservation> reservations) {

    // 1. 정제 (Period, InterviewReservation는 이미 도메인 객체이므로 정제 불필요)

    // 2. 선택 멤버 변수 기본값 처리
    List<InterviewReservation> resolvedReservations =
        reservations != null ? reservations : List.of();

    // 3. 검증
    InterviewSlotValidator.validate(
        id, creatorId, announcementId, maxNumberOfPeople, period, resolvedReservations);

    // 4. 할당
    this.id = id;
    this.creatorId = creatorId;
    this.announcementId = announcementId;
    this.maxNumberOfPeople = maxNumberOfPeople;
    this.period = period;
    this.reservations = List.copyOf(resolvedReservations);
  }

  public static InterviewSlot initialize(
      String creatorId,
      String announcementId,
      Integer maxNumberOfPeople,
      LocalDateTime start,
      Integer interviewDuration) {

    Period period =
        Period.builder().startDate(start).endDate(start.plusMinutes(interviewDuration)).build();

    // 상태 검증
    if (!period.startDate().toLocalDate().equals(period.endDate().toLocalDate())) {
      throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_PERIOD_INVALID);
    }

    return InterviewSlot.builder()
        .id(DEFAULT_INITIAL_ID)
        .creatorId(creatorId)
        .announcementId(announcementId)
        .maxNumberOfPeople(maxNumberOfPeople)
        .period(period)
        .reservations(List.of()) // 초기화 시에는 예약이 없으므로 빈 리스트로 설정
        .build();
  }

  public InterviewSlot addReservations(InterviewReservation newReservation, boolean allowOverMax) {
    int maxCount = this.maxNumberOfPeople;
    List<InterviewReservation> newInterviewReservations = new ArrayList<>(this.reservations);

    this.reservations.stream()
        .filter(r -> r.getApplicant().getId().equals(newReservation.getApplicant().getId()))
        .findFirst()
        .ifPresent(
            existingReservation -> {
              // 이미 예약된 지원자의 경우 예외 발생
              throw new InterviewException(InterviewErrorCode.APPLICANT_ALREADY_RESERVED);
            });

    if (maxNumberOfPeople == reservations.size()) {
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
        .reservations(List.copyOf(newInterviewReservations))
        .build();
  }

  public InterviewSlot removeReservation(InterviewReservation reservation) {
    Set<InterviewReservation> newReservations = new HashSet<>(this.reservations);
    newReservations.removeIf(r -> r.getId().equals(reservation.getId()));

    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .period(this.period)
        .reservations(List.copyOf(newReservations))
        .build();
  }

  // Getter 어노테이션이 생성하는 Get 메서드보다 직접 작성한 Get 메서드가 우선시 됨.
  public List<InterviewReservation> getReservations() {
    return List.copyOf(reservations);
  }

  public InterviewReservation getReservationByApplicantId(String applicantId) {
    return reservations.stream()
        .filter(reservation -> reservation.getApplicant().getId().equals(applicantId))
        .findFirst()
        .orElseThrow(
            () ->
                new NoSuchElementException(
                    "Interview reservation not found for applicant: " + applicantId));
  }

  public boolean hasReservationForApplicant(String applicantId) {
    return reservations.stream()
        .anyMatch(reservation -> reservation.getApplicant().getId().equals(applicantId));
  }
}
