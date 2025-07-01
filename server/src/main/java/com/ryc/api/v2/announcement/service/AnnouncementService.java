package com.ryc.api.v2.announcement.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementCreateResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetAllResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementGetDetailResponse;
import com.ryc.api.v2.announcement.presentation.dto.response.AnnouncementUpdateResponse;
import com.ryc.api.v2.club.business.ClubService;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;

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
    // 1. 삭제되지 않은 공고 불러오기
    List<Announcement> announcements = announcementRepository.findAllByIsDeleted(false);

    // 2.공고 상태 업데이트
    List<Announcement> updatedAnnouncements =
        announcements.stream().map(Announcement::updateStatus).toList();

    // 3. announcement에서 clubId 불러오기
    Set<String> ids =
        updatedAnnouncements.stream().map(Announcement::getClubId).collect(Collectors.toSet());

    // 4. 해당 Id로 Club조회 후 Map
    Map<String, ClubEntity> clubs =
        clubJpaRepository.findAllById(ids).stream()
            .collect(Collectors.toMap(ClubEntity::getId, club -> club));

    // 5. 공고 저장
    announcementRepository.saveAll(updatedAnnouncements, clubs);
  }

  /**
   * TODO club도메인에서 jpql로 공고 상태 조회로 최적화
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
}
