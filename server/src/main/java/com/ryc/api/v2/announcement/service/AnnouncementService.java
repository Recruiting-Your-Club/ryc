package com.ryc.api.v2.announcement.service;

import java.util.*;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementProcess;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.*;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.common.aop.annotation.ValidClub;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.common.util.HtmlImageParser;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnnouncementService {

  private final AnnouncementRepository announcementRepository;
  private final FileService fileService;
  private final HtmlImageParser htmlImageParser;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public AnnouncementCreateResponse createAnnouncement(
      String clubId, AnnouncementCreateRequest request) {
    // Announcement 생성
    Announcement announcement = Announcement.initialize(request, clubId);

    Announcement savedAnnouncement = announcementRepository.save(announcement);

    List<String> postImages = htmlImageParser.extractImageIds(request.detailDescription());
    if (request.images().size() > 10) {
      throw new BusinessRuleException(AnnouncementErrorCode.IMAGE_LIMIT_EXCEEDED);
    }

    if (postImages.size() > 10) {
      throw new BusinessRuleException(AnnouncementErrorCode.POST_IMAGE_LIMIT_EXCEEDED);
    }

    fileService.claimOwnership(
        request.images(), savedAnnouncement.getId(), FileDomainType.ANNOUNCEMENT_IMAGE);

    fileService.claimOwnership(
        postImages, savedAnnouncement.getId(), FileDomainType.ANNOUNCEMENT_POST_IMAGE);

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

    // 3. 이미지 파일 업데이트
    if (request.images().size() > 10) {
      throw new BusinessRuleException(AnnouncementErrorCode.IMAGE_LIMIT_EXCEEDED);
    }

    List<String> postImages = htmlImageParser.extractImageIds(request.detailDescription());

    if (postImages.size() > 10) {
      throw new BusinessRuleException(AnnouncementErrorCode.POST_IMAGE_LIMIT_EXCEEDED);
    }

    fileService.claimOwnership(postImages, announcementId, FileDomainType.ANNOUNCEMENT_POST_IMAGE);

    fileService.claimOwnership(
        request.images(), updateAnnouncement.getId(), FileDomainType.ANNOUNCEMENT_IMAGE);

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

  // TODO: club도메인에서 jpql로 공고 상태 조회로 최적화
  public Map<String, AnnouncementStatus> getStatusesByClubIds(List<String> clubIds) {
    Map<String, List<Announcement>> announcementsMap =
        announcementRepository.findAllByClubIds(clubIds);
    Map<String, AnnouncementStatus> statuses = new HashMap<>();

    announcementsMap.forEach(
        (clubId, announcements) -> {
          AnnouncementStatus status = getAnnouncementStatuses(announcements);
          statuses.put(clubId, status);
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
    if (announcementIds.isEmpty()) {
      return;
    }

    eventPublisher.publishEvent(new AnnouncementDeletedEvent(announcementIds));
    announcementRepository.deleteAllByIdIn(announcementIds);
  }

  @EventListener
  protected void handleClubDeletedEvent(ClubDeletedEvent event) {
    List<String> ids = announcementRepository.findIdsByClubId(event.clubId());
    deleteAnnouncements(ids);
  }

  /*
   * 파라미터로 받은 공고 목록을 조합하여
   * 하나의 공고 상태를 결정하는 메소드
   */
  private AnnouncementStatus getAnnouncementStatuses(List<Announcement> announcements) {
    if (announcements.isEmpty()) {
      return AnnouncementStatus.EMPTY;
    }

    boolean hasRecruiting =
        announcements.stream()
            .anyMatch(
                announcement ->
                    announcement.getAnnouncementStatus() == AnnouncementStatus.RECRUITING);
    boolean hasUpcoming =
        announcements.stream()
            .anyMatch(
                announcement ->
                    announcement.getAnnouncementStatus() == AnnouncementStatus.UPCOMING);

    if (hasRecruiting) {
      return AnnouncementStatus.RECRUITING;
    } else if (hasUpcoming) {
      return AnnouncementStatus.UPCOMING;
    }
    return AnnouncementStatus.CLOSED;
  }

  private boolean shouldIncludeProcess(AnnouncementProcess process, Announcement announcement) {
    return process != AnnouncementProcess.INTERVIEW
        || Boolean.TRUE.equals(announcement.getHasInterview());
  }
}
