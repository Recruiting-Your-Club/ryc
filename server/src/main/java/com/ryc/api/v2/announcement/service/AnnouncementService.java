package com.ryc.api.v2.announcement.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementUpdateResponse;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.service.ClubService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnnouncementService {
  private final AnnouncementRepository announcementRepository;
  private final ClubService clubService;
  private final ClubJpaRepository clubJpaRepository;

  @Transactional
  public AnnouncementCreateResponse createAnnouncement(
      String clubId, AnnouncementCreateRequest request) {
    // 1.Club 찾기

    // 2.Announcement 생성
    Announcement announcement = Announcement.initialize(request, clubId);

    ClubEntity clubProxy = clubJpaRepository.getReferenceById(clubId);

    Announcement savedAnnouncement = announcementRepository.save(announcement, clubProxy);

    return new AnnouncementCreateResponse(savedAnnouncement.getId());
  }

  @Transactional(readOnly = true)
  public List<AnnouncementGetAllResponse> findAllByClubId(String clubId) {
    // 1. todo club 조회

    // 2. 클럽 ID에 해당하는 모든 공고 조회
    List<Announcement> announcements = announcementRepository.findAllByClubId(clubId);

    // 3. 도메인 객체 목록을 응답 DTO 목록으로 변환
    return announcements.stream().map(AnnouncementGetAllResponse::from).toList();
  }

  @Transactional(readOnly = true)
  public AnnouncementGetDetailResponse findById(String announcementId) {
    // 1. todo club 조회

    // 공고 ID로 공고 조회
    Announcement announcement = announcementRepository.findByIdWithApplication(announcementId);

    // 도메인 객체를 상세 응답 DTO로 변환
    return AnnouncementGetDetailResponse.from(announcement);
  }

  // todo @hasAnyRole,
  @Transactional
  public AnnouncementUpdateResponse updateAnnouncement(
      AnnouncementUpdateRequest request, String announcementId) {
    // 1. 기존 Announcement 조회
    Announcement existingAnnouncement =
        announcementRepository.findByIdWithApplication(announcementId);

    // 2. 기존 Announcement 정보를 기반으로 업데이트된 Announcement 도메인 객체 생성
    Announcement updatedAnnouncement = existingAnnouncement.update(request);

    ClubEntity clubProxy = clubJpaRepository.getReferenceById(updatedAnnouncement.getClubId());
    // 3. 업데이트된 Announcement 저장
    announcementRepository.save(updatedAnnouncement, clubProxy);

    return AnnouncementUpdateResponse.from(updatedAnnouncement);
  }

  @Transactional
  public void updateAnnouncementStatus() {
    List<Announcement> announcements = announcementRepository.findAllByIsDeleted(false);

    List<Announcement> updatedAnnouncements =
        announcements.stream().map(Announcement::updateStatus).toList();

    Set<String> ids =
        updatedAnnouncements.stream().map(Announcement::getClubId).collect(Collectors.toSet());

    Map<String, ClubEntity> clubs =
        clubJpaRepository.findAllById(ids).stream()
            .collect(Collectors.toMap(ClubEntity::getId, club -> club));

    announcementRepository.saveAll(updatedAnnouncements, clubs);
  }
}
