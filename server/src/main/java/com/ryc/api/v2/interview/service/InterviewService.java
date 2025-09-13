package com.ryc.api.v2.interview.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantSummaryResponse;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.dto.response.PeriodResponse;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;
import com.ryc.api.v2.email.domain.event.InterviewReservationEmailEvent;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.interview.domain.InterviewRepository;
import com.ryc.api.v2.interview.domain.InterviewReservation;
import com.ryc.api.v2.interview.domain.InterviewSlot;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewReservationUpdatedRequest;
import com.ryc.api.v2.interview.presentation.dto.request.InterviewSlotCreateRequest;
import com.ryc.api.v2.interview.presentation.dto.response.*;
import com.ryc.api.v2.interview.presentation.dto.response.InterviewReminderUpdatedResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewService {

  private final InterviewRepository interviewRepository;
  private final ClubRepository clubRepository;
  private final ApplicantRepository applicantRepository;
  private final AnnouncementRepository announcementRepository;
  private final FileService fileService;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional(readOnly = true)
  public List<InterviewSlotResponse> getInterviewSlots(String announcementId) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findSlotsByAnnouncementId(announcementId);

    return interviewSlots.stream()
        .sorted(Comparator.comparing(slot -> slot.getPeriod().startDate()))
        .map(this::createInterviewSlotResponse)
        .toList();
  }

  @Transactional(readOnly = true)
  public InterviewSlotsApplicantViewResponse getInterviewSlotsApplicantView(
      String clubId, String announcementId, String applicantId) {

    Club club = clubRepository.findById(clubId);
    Applicant applicant = applicantRepository.findById(applicantId);
    List<InterviewSlot> interviewSlots =
        interviewRepository.findSlotsByAnnouncementId(announcementId);
    Boolean isReserved =
        interviewSlots.stream().anyMatch(slot -> slot.hasReservationForApplicant(applicantId));

    List<InterviewSlotsByDateResponse> slotResponses =
        interviewSlots.stream()
            .map(this::createInterviewSlotResponse)
            .collect(Collectors.groupingBy(slot -> slot.period().startDate().toLocalDate()))
            .entrySet()
            .stream()
            .map(entry -> createInterviewSlotsByDateResponse(entry.getKey(), entry.getValue()))
            .sorted(Comparator.comparing(InterviewSlotsByDateResponse::date))
            .toList();

    FileGetResponse representativeImage =
        fileService.findAllByAssociatedId(clubId).stream()
            .filter(fileMetaData -> fileMetaData.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(
                fileMetaData ->
                    FileGetResponse.of(fileMetaData, fileService.getPublicFileGetUrl(fileMetaData)))
            .orElse(null);

    FileGetResponse applicantProfile =
        fileService.findAllByAssociatedId(applicantId).stream()
            .filter(
                fileMetaData ->
                    fileMetaData.getFileDomainType() == FileDomainType.APPLICANT_PROFILE)
            .findFirst()
            .map(
                fileMetaData ->
                    FileGetResponse.of(
                        fileMetaData, fileService.getPrivateFileGetUrl(fileMetaData)))
            .orElse(null);

    Map<String, FileGetResponse> imageMap =
        applicantProfile == null
            ? Collections.emptyMap()
            : Collections.singletonMap(applicantId, applicantProfile);
    ApplicantSummaryResponse applicantSummaryResponse =
        createApplicantSummaryResponse(applicant, imageMap);

    return InterviewSlotsApplicantViewResponse.builder()
        .clubName(club.getName())
        .clubCategory(club.getCategory().toString())
        .slotByDateResponses(slotResponses)
        .representativeImage(representativeImage)
        .applicantSummary(applicantSummaryResponse)
        .isReserved(isReserved)
        .build();
  }

  @Transactional(readOnly = true)
  public InterviewSlotPeopleCountResponse getCountByInterviewSlot(String interviewSlotId) {
    InterviewSlot slot = interviewRepository.findSlotById(interviewSlotId);
    return new InterviewSlotPeopleCountResponse(
        slot.getMaxNumberOfPeople(), slot.getReservations().size());
  }

  @Transactional(readOnly = true)
  public List<InterviewReservationGetResponse> getInterviewReservations(String interviewSlotId) {
    InterviewSlot interviewSlot = interviewRepository.findSlotById(interviewSlotId);
    List<InterviewReservation> reservations = interviewSlot.getReservations();

    List<String> interviewerIds =
        reservations.stream().map(reservation -> reservation.getApplicant().getId()).toList();

    Map<String, FileGetResponse> interviewerImages =
        fileService.findAllByAssociatedIdIn(interviewerIds).stream()
            .filter(
                fileMetaData ->
                    fileMetaData.getFileDomainType() == FileDomainType.APPLICANT_PROFILE)
            .collect(
                Collectors.toMap(
                    FileMetaData::getAssociatedId,
                    fileMetaData -> {
                      String url = fileService.getPrivateFileGetUrl(fileMetaData);
                      return FileGetResponse.of(fileMetaData, url);
                    }));

    return reservations.stream()
        .map(
            reservation -> {
              ApplicantSummaryResponse applicantSummaryResponse =
                  createApplicantSummaryResponse(reservation.getApplicant(), interviewerImages);

              return InterviewReservationGetResponse.builder()
                  .interviewReservationId(reservation.getId())
                  .applicantSummary(applicantSummaryResponse)
                  .build();
            })
        .toList();
  }

  @Transactional(readOnly = true)
  public List<ApplicantSummaryResponse> getInterviewUnReservations(String announcementId) {
    List<InterviewSlot> interviewSlots =
        interviewRepository.findSlotsByAnnouncementId(announcementId);
    Set<Applicant> applicants =
        new HashSet<>(applicantRepository.findAllByAnnouncementId(announcementId));

    Set<String> reservedApplicantIds =
        interviewSlots.stream()
            .flatMap(slot -> slot.getReservations().stream())
            .map(reservation -> reservation.getApplicant().getId())
            .collect(Collectors.toSet());

    applicants.removeIf(applicant -> reservedApplicantIds.contains(applicant.getId()));
    applicants.removeIf(applicant -> applicant.getStatus() == ApplicantStatus.INTERVIEW_PENDING);

    List<String> ids = applicants.stream().map(Applicant::getId).toList();
    Map<String, FileGetResponse> imageMap =
        fileService.findAllByAssociatedIdIn(ids).stream()
            .filter(
                fileMetaData ->
                    fileMetaData.getFileDomainType() == FileDomainType.APPLICANT_PROFILE)
            .collect(
                Collectors.toMap(
                    FileMetaData::getAssociatedId,
                    fileMetaData -> {
                      String url = fileService.getPrivateFileGetUrl(fileMetaData);
                      return FileGetResponse.of(fileMetaData, url);
                    }));

    return applicants.stream()
        .map(applicant -> createApplicantSummaryResponse(applicant, imageMap))
        .toList();
  }

  @Transactional
  public List<InterviewSlotResponse> createInterviewSlots(
      String adminId, String announcementId, InterviewSlotCreateRequest body) {

    // 만약 요청받는 시작 시간이 이미 존재하는 시작 시간과 겹친다면 예외 발생
    Set<LocalDateTime> existingStartDates =
        interviewRepository.findSlotsByAnnouncementId(announcementId).stream()
            .map(slot -> slot.getPeriod().startDate())
            .collect(Collectors.toSet());

    if (body.slotDetailRequests().stream()
        .anyMatch(slotDetailRequest -> existingStartDates.contains(slotDetailRequest.start()))) {
      throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_ALREADY_EXISTS);
    }

    // 면접 슬롯 생성 및 저장
    List<InterviewSlot> interviewSlots =
        body.slotDetailRequests().stream()
            .map(
                slotDetailRequest ->
                    InterviewSlot.initialize(
                        adminId,
                        announcementId,
                        slotDetailRequest.maxPeopleCount(),
                        slotDetailRequest.start(),
                        body.interviewDuration()))
            .toList();

    List<InterviewSlot> savedInterviewSlots = interviewRepository.saveAllSlot(interviewSlots);
    return savedInterviewSlots.stream().map(this::createInterviewSlotResponse).toList();
  }

  @Transactional
  public InterviewReservationCreateResponse reservationInterview(
      String slotId, InterviewReservationRequest body) {
    // 요청된 면접 일정을 가져옵니다.
    InterviewSlot interviewSlot = interviewRepository.findSlotByIdWithLock(slotId);

    // 지원자의 예약 정보를 생성합니다.
    Applicant applicant = applicantRepository.findById(body.applicantId());
    InterviewReservation reservation = InterviewReservation.initialize(applicant);

    // 새로운 예약 정보를 저장합니다.
    InterviewSlot updatedInterviewSlot = interviewSlot.addReservations(reservation);
    InterviewSlot savedInterviewSlot = interviewRepository.saveSlot(updatedInterviewSlot);
    InterviewReservation savedReservation =
        savedInterviewSlot.getReservations().stream()
            .filter(r -> r.getApplicant().getId().equals(applicant.getId()))
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("예약 정보가 없습니다. 서버 오류일 수 있습니다."));

    // 이메일 이벤트를 발행
    String clubName =
        announcementRepository.findClubNameByAnnouncementId(savedInterviewSlot.getAnnouncementId());
    eventPublisher.publishEvent(
        InterviewReservationEmailEvent.builder()
            .clubName(clubName)
            .applicantEmail(savedReservation.getApplicant().getEmail())
            .applicantName(savedReservation.getApplicant().getName())
            .announcementId(savedInterviewSlot.getAnnouncementId())
            .period(savedInterviewSlot.getPeriod())
            .build());

    return new InterviewReservationCreateResponse(savedReservation.getId());
  }

  @Transactional
  public void changeMaxPeopleCount(String slotId, int newMaxCount) {
    InterviewSlot slot = interviewRepository.findSlotByIdWithLock(slotId);
    InterviewSlot updatedSlot = slot.changeMaxNumberOfPeople(newMaxCount);
    interviewRepository.saveSlot(updatedSlot);
  }

  @Transactional
  public InterviewReservationUpdateResponse changeInterviewReservation(
      String applicantId, InterviewReservationUpdatedRequest body) {

    InterviewReservation reservation;

    Optional<InterviewSlot> interviewSlotOptional =
        interviewRepository.findSlotByApplicantIdWithLock(applicantId);

    // 기존 면접 슬롯이 있는지 확인하고, 해당 슬롯에서 지원자의 예약을 제거합니다.
    if (interviewSlotOptional.isPresent()) {
      InterviewSlot slot = interviewSlotOptional.get();

      reservation = slot.getReservationByApplicantId(applicantId);

      InterviewSlot updatedSlot = slot.removeReservation(reservation);
      interviewRepository.saveSlot(updatedSlot);
    } else {
      // 기존 면접 슬롯이 없는 경우, 새로운 예약을 생성합니다.
      Applicant applicant = applicantRepository.findById(applicantId);
      reservation = InterviewReservation.initialize(applicant);
    }

    // 새로운 면접 슬롯에 예약 정보 추가
    InterviewSlot newSlot = interviewRepository.findSlotByIdWithLock(body.interviewSlotId());
    InterviewSlot updatedSlot = newSlot.addReservations(reservation);

    InterviewSlot savedSlot = interviewRepository.saveSlot(updatedSlot);
    String reservationId = savedSlot.getReservationByApplicantId(applicantId).getId();

    InterviewSlotResponse slotGetResponse = createInterviewSlotResponse(savedSlot);
    return InterviewReservationUpdateResponse.builder()
        .interviewReservationId(reservationId)
        .interviewSlot(slotGetResponse)
        .build();
  }

  @Transactional
  public void deleteInterviewSlot(String interviewSlotId) {
    InterviewSlot slot = interviewRepository.findSlotById(interviewSlotId);

    if (!slot.getReservations().isEmpty()) {
      throw new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_ALREADY_RESERVED);
    }
    interviewRepository.deleteSlotById(slot.getId());
  }

  @Transactional
  public void deleteInterviewReservation(String reservationId) {
    if (!interviewRepository.existsReservationById(reservationId)) {
      throw new NoSuchElementException("Interview reservation not found for id: " + reservationId);
    }

    interviewRepository.deleteReservationById(reservationId);
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleAnnouncementDeletedEvent(AnnouncementDeletedEvent event) {
    event.announcementIds().stream()
        .filter(interviewRepository::existsSlotsByAnnouncementId)
        .forEach(interviewRepository::deleteSlotsByAnnouncementId);
  }

  private InterviewSlotResponse createInterviewSlotResponse(InterviewSlot slot) {
    PeriodResponse periodResponse = PeriodResponse.from(slot.getPeriod());
    int size = slot.getReservations().size();

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

  private ApplicantSummaryResponse createApplicantSummaryResponse(
      Applicant applicant, Map<String, FileGetResponse> imageMap) {

    return ApplicantSummaryResponse.builder()
        .applicantId(applicant.getId())
        .applicantEmail(applicant.getEmail())
        .applicantName(applicant.getName())
        .representativeImage(imageMap.get(applicant.getId()))
        .imagePresent(imageMap.containsKey(applicant.getId()))
        .build();
  }

  public List<InterviewReminderUpdatedResponse> changeTimeToReminder(
      String announcementId, Integer timeToReminder) {
    List<InterviewSlot> slots = interviewRepository.findSlotsByAnnouncementId(announcementId);
    List<InterviewSlot> changedSlots =
        slots.stream().map(slot -> slot.changeRelativeHour(timeToReminder)).toList();
    return interviewRepository.saveAllSlot(changedSlots).stream()
        .map(slot -> new InterviewReminderUpdatedResponse(slot.getId(), slot.getTimeToReminder()))
        .toList();
  }
}
