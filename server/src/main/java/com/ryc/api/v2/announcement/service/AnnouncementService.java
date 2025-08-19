package com.ryc.api.v2.announcement.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementProcess;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.*;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.common.aop.annotation.ValidClub;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnnouncementService {

  private final AnnouncementRepository announcementRepository;
  private final FileService fileService;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public AnnouncementCreateResponse createAnnouncement(
      String clubId, AnnouncementCreateRequest request) {
    // Announcement 생성
    Announcement announcement = Announcement.initialize(request, clubId);

    Announcement savedAnnouncement = announcementRepository.save(announcement);

    fileService.claimOwnershipAsync(request.images(), savedAnnouncement.getId());
    return new AnnouncementCreateResponse(savedAnnouncement.getId());
  }

  @Transactional(readOnly = true)
  public List<AnnouncementGetAllResponse> findAllByClubId(String clubId) {
    // 1. 클럽 ID에 해당하는 모든 공고 조회
    List<Announcement> announcements = announcementRepository.findAllByClubId(clubId);

    // 2. 도메인 객체 목록을 응답 DTO 목록으로 변환
    return announcements.stream().map(AnnouncementGetAllResponse::from).toList();
  }

  @Transactional(readOnly = true)
  public AnnouncementGetDetailResponse findById(String announcementId) {
    // 공고 ID로 공고 조회
    Announcement announcement = announcementRepository.findById(announcementId);

    List<FileGetResponse> imageResponses =
        fileService.findAllByAssociatedId(announcementId).stream()
            .filter(
                fileMetaData ->
                    fileMetaData.getFileDomainType() == FileDomainType.ANNOUNCEMENT_IMAGE)
            .map(
                fileMetaData ->
                    FileGetResponse.of(fileMetaData, fileService.getPublicFileGetUrl(fileMetaData)))
            .toList();

    // 도메인 객체를 상세 응답 DTO로 변환
    return AnnouncementGetDetailResponse.of(announcement, imageResponses);
  }

  @Transactional
  @ValidClub
  public AnnouncementUpdateResponse updateAnnouncement(
      AnnouncementUpdateRequest request, String announcementId, String clubId) {

    Announcement updateAnnouncement = Announcement.of(request, announcementId, clubId);

    // 2. 업데이트된 Announcement 저장
    Announcement updatedAnnouncement = announcementRepository.save(updateAnnouncement);

    fileService.claimOwnershipSync(request.images(), updateAnnouncement.getId());
    List<FileGetResponse> imageResponses =
        fileService.findAllByAssociatedId(announcementId).stream()
            .filter(
                fileMetaData ->
                    fileMetaData.getFileDomainType() == FileDomainType.ANNOUNCEMENT_IMAGE)
            .map(
                fileMetaData ->
                    FileGetResponse.of(fileMetaData, fileService.getPublicFileGetUrl(fileMetaData)))
            .toList();

    return AnnouncementUpdateResponse.of(updatedAnnouncement, imageResponses);
  }

  @Transactional
  public void updateAnnouncementStatus() {
    // 1. 삭제되지 않은 공고 불러오기
    List<Announcement> announcements = announcementRepository.findAll();

    // 2.공고 상태 업데이트
    List<Announcement> updatedAnnouncements =
        announcements.stream().map(Announcement::updateStatus).toList();

    // 3. 공고 저장
    announcementRepository.saveAll(updatedAnnouncements);
  }

  /**
   * TODO: club도메인에서 jpql로 공고 상태 조회로 최적화
   *
   * @param clubIds 모든 클럽 Id리스트
   * @return 모든 클럽의 공고 상태
   */
  public Map<String, AnnouncementStatus> getStatusesByClubIds(List<String> clubIds) {
    // 1. Mapping
    Map<String, AnnouncementStatus> statuses =
        announcementRepository.getStatusesByClubIds(clubIds).stream()
            .collect(
                Collectors.toMap(
                    ClubAnnouncementStatusDto::clubId, ClubAnnouncementStatusDto::status));

    // 2. 공고가 없는 경우 EMPTY 삽입
    clubIds.forEach(
        clubId -> {
          if (!statuses.containsKey(clubId)) {
            statuses.put(clubId, AnnouncementStatus.EMPTY);
          }
        });

    return statuses;
  }

  @Transactional(readOnly = true)
  public AnnouncementProcessGetResponse getAnnouncementProcess(String announcementId) {
    final List<AnnouncementProcess> defaultProcess =
        List.of(
            AnnouncementProcess.DOCUMENT, AnnouncementProcess.INTERVIEW, AnnouncementProcess.FINAL);

    Announcement announcement = announcementRepository.findById(announcementId);

    List<AnnouncementProcess> processes =
        defaultProcess.stream()
            .filter(process -> shouldIncludeProcess(process, announcement))
            .toList();

    return new AnnouncementProcessGetResponse(processes);
  }

  @Transactional
  public void deleteAnnouncements(List<String> announcementIds) {
    eventPublisher.publishEvent(new AnnouncementDeletedEvent(announcementIds));
    announcementRepository.deleteAllByIdIn(announcementIds);
  }

  @EventListener
  @Transactional
  protected void handleClubDeletedEvent(ClubDeletedEvent event) {
    List<String> ids = announcementRepository.findIdsByClubId(event.clubId());
    deleteAnnouncements(ids);
  }

  private boolean shouldIncludeProcess(AnnouncementProcess process, Announcement announcement) {
    return process != AnnouncementProcess.INTERVIEW
        || Boolean.TRUE.equals(announcement.getHasInterview());
  }
}
