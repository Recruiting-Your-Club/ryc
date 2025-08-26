package com.ryc.api.v2.interview.service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.announcement.presentation.dto.response.PeriodResponse;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantSummaryResponse;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.email.domain.event.InterviewReservationEmailEvent;
import com.ryc.api.v2.email.domain.event.InterviewSlotEmailEvent;
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

    return interviewSlots.stream().map(this::createInterviewSlotResponse).toList();
  }

  @Transactional(readOnly = true)
  public InterviewSlotsApplicantViewResponse getInterviewSlotsApplicantView(
      String clubId, String announcementId, String applicantId) {

    Club club = clubRepository.findById(clubId);
    Applicant applicant = applicantRepository.findById(applicantId);
    Boolean isReserved =
        interviewRepository.isReservedByAnnouncementIdAndApplicantId(announcementId, applicantId);
    List<InterviewSlot> interviewSlots =
        interviewRepository.findSlotsByAnnouncementId(announcementId);

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
        slot.getMaxNumberOfPeople(), slot.getInterviewReservations().size());
  }

  @Transactional(readOnly = true)
  public List<InterviewReservationGetResponse> getInterviewReservations(String interviewSlotId) {
    InterviewSlot interviewSlot = interviewRepository.findSlotById(interviewSlotId);
    List<InterviewReservation> reservations = interviewSlot.getInterviewReservations();

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
            .flatMap(slot -> slot.getInterviewReservations().stream())
            .map(reservation -> reservation.getApplicant().getId())
            .collect(Collectors.toSet());

    applicants.removeIf(applicant -> reservedApplicantIds.contains(applicant.getId()));

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
  public List<InterviewSlotCreateResponse> createInterviewSlots(
      String adminId, String clubId, String announcementId, InterviewSlotCreateRequest request) {

    List<InterviewSlot> interviewSlots =
        request.numberOfPeopleByInterviewDateRequests().stream()
            .map(
                r ->
                    InterviewSlot.initialize(
                        adminId,
                        announcementId,
                        r.numberOfPeople(),
                        r.start(),
                        r.interviewDuration()))
            .toList();

    List<InterviewSlot> savedInterviewSlots = interviewRepository.saveAllSlot(interviewSlots);

    // 이메일 전송을 위한 이벤트 발행
    List<Applicant> applicants =
        applicantRepository.findByEmails(request.emailSendRequest().recipients());
    eventPublisher.publishEvent(
        InterviewSlotEmailEvent.builder()
            .applicants(applicants)
            .subject(request.emailSendRequest().subject())
            .content(request.emailSendRequest().content())
            .adminId(adminId)
            .clubId(clubId)
            .announcementId(announcementId)
            .build());

    return savedInterviewSlots.stream()
        .map(slot -> new InterviewSlotCreateResponse(slot.getId()))
        .toList();
  }

  @Transactional
  public InterviewReservationCreateResponse reservationInterview(
      String slotId, InterviewReservationRequest body) {

    // 요청된 면접 일정을 가져옵니다.
    InterviewSlot interviewSlot = interviewRepository.findSlotByIdForUpdate(slotId);

    // 지원자의 예약 정보를 생성합니다.
    Applicant applicant = applicantRepository.findById(body.applicantId());
    InterviewReservation reservation = InterviewReservation.initialize(applicant);

    // 새로운 예약 정보를 저장합니다.
    InterviewSlot updatedInterviewSlot = interviewSlot.addInterviewReservations(reservation, false);
    InterviewSlot savedInterviewSlot = interviewRepository.saveSlot(updatedInterviewSlot);
    InterviewReservation savedReservation =
        savedInterviewSlot.getInterviewReservations().stream()
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
  public InterviewReservationUpdateResponse changeInterviewReservation(
      String applicantId, InterviewReservationUpdatedRequest body) {

    InterviewReservation reservation;

    // 기존 면접 슬롯이 있는지 확인하고, 해당 슬롯에서 지원자의 예약을 제거합니다.
    Optional<InterviewSlot> interviewSlotOptional =
        interviewRepository.findSlotByApplicantIdForUpdate(applicantId);

    if (interviewSlotOptional.isPresent()) {
      InterviewSlot slot = interviewSlotOptional.get();

      reservation = slot.getInterviewReservationByApplicantId(applicantId);

      InterviewSlot updatedSlot = slot.removeReservation(reservation);
      interviewRepository.saveSlot(updatedSlot);
    } else {
      // 기존 면접 슬롯이 없는 경우, 새로운 예약을 생성합니다.
      Applicant applicant = applicantRepository.findById(applicantId);
      reservation = InterviewReservation.initialize(applicant);
    }

    // 새로운 면접 슬롯에 예약 정보 추가
    InterviewSlot newSlot = interviewRepository.findSlotByIdForUpdate(body.interviewSlotId());
    InterviewSlot updatedSlot = newSlot.addInterviewReservations(reservation, true);

    InterviewSlot savedSlot = interviewRepository.saveSlot(updatedSlot);
    String reservationId = savedSlot.getInterviewReservationByApplicantId(applicantId).getId();

    InterviewSlotResponse slotGetResponse = createInterviewSlotResponse(savedSlot);
    return InterviewReservationUpdateResponse.builder()
        .interviewReservationId(reservationId)
        .interviewSlot(slotGetResponse)
        .build();
  }

  @Transactional
  public void deleteInterviewReservation(String reservationId) {
    if (!interviewRepository.existsReservationById(reservationId)) {
      throw new NoSuchElementException("Interview reservation not found for id: " + reservationId);
    }

    interviewRepository.deleteReservationById(reservationId);
  }

  @EventListener
  protected void handleAnnouncementDeletedEvent(AnnouncementDeletedEvent event) {
    event.announcementIds().stream()
        .filter(interviewRepository::existsSlotsByAnnouncementId)
        .forEach(interviewRepository::deleteSlotsByAnnouncementId);
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
}
