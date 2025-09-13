package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;
import java.util.*;

import com.ryc.api.v2.common.domain.Period;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
public class InterviewSlot {

  private final String id;
  private final String creatorId;
  private final String announcementId;
  private final Integer maxNumberOfPeople;
  private final Integer reminderTime; // null 허용
  private final Period period;
  private final List<InterviewReservation> reservations;
  private final EmailSentStatus reminderStatus;

  @Builder
  private InterviewSlot(
      String id,
      String creatorId,
      String announcementId,
      Integer maxNumberOfPeople,
      Integer reminderTime,
      Period period,
      List<InterviewReservation> reservations,
      EmailSentStatus reminderStatus) {

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
    this.reminderTime = reminderTime;
    this.period = period;
    this.reservations = List.copyOf(resolvedReservations);
    this.reminderStatus = reminderStatus;
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
        .reminderTime(24) // 기본값 24시간
        .period(period)
        .reservations(List.of()) // 초기화 시에는 예약이 없으므로 빈 리스트로 설정
        .reminderStatus(EmailSentStatus.PENDING) // 초기 상태는 PENDING
        .build();
  }

  public InterviewSlot addReservations(InterviewReservation newReservation) {
    // 비즈니스 검증
    this.reservations.stream()
        .filter(r -> r.getApplicant().getId().equals(newReservation.getApplicant().getId()))
        .findFirst()
        .ifPresent(
            existingReservation -> {
              // 이미 예약된 지원자의 경우 예외 발생
              throw new InterviewException(InterviewErrorCode.APPLICANT_ALREADY_RESERVED);
            });

    if (maxNumberOfPeople == reservations.size()) {
      throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_FULL);
    }

    // 새로운 예약 추가
    List<InterviewReservation> newInterviewReservations = new ArrayList<>(this.reservations);
    newInterviewReservations.add(newReservation);

    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .reminderTime(this.reminderTime)
        .period(this.period)
        .reservations(List.copyOf(newInterviewReservations))
        .reminderStatus(this.reminderStatus)
        .build();
  }

  public InterviewSlot changeMaxNumberOfPeople(int newMaxNumberOfPeople) {
    // 비즈니스 검증
    if (newMaxNumberOfPeople < this.reservations.size()) {
      throw new InterviewException(InterviewErrorCode.NEW_MAX_NUMBER_LESS_THAN_RESERVATIONS);
    }

    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(newMaxNumberOfPeople)
        .reminderTime(this.reminderTime)
        .period(this.period)
        .reservations(List.copyOf(this.reservations))
        .reminderStatus(this.reminderStatus)
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
        .reminderTime(this.reminderTime)
        .period(this.period)
        .reservations(List.copyOf(newReservations))
        .reminderStatus(this.reminderStatus)
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

  public InterviewSlot changeReminderTime(Integer newTimeToReminder) {
    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .reminderTime(newTimeToReminder)
        .period(this.period)
        .reservations(this.reservations)
        .reminderStatus(this.reminderStatus)
        .build();
  }

  public InterviewSlot deleteReminder() {
    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .reminderTime(null) // 알림 시간을 null로 설정
        .period(this.period)
        .reservations(this.reservations)
        .reminderStatus(this.reminderStatus)
        .build();
  }

  public InterviewSlot changeReminderStatus(EmailSentStatus newReminderStatus) {
    return InterviewSlot.builder()
        .id(this.id)
        .creatorId(this.creatorId)
        .announcementId(this.announcementId)
        .maxNumberOfPeople(this.maxNumberOfPeople)
        .reminderTime(this.reminderTime)
        .period(this.period)
        .reservations(this.reservations)
        .reminderStatus(newReminderStatus)
        .build();
  }
}
