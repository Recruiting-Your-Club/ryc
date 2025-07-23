package com.ryc.api.v2.announcement.service;

import java.util.List;
import java.util.Map;
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
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.service.ClubService;
import com.ryc.api.v2.common.aop.annotation.ValidClub;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnnouncementService {
  private final AnnouncementRepository announcementRepository;
  private final ClubService clubService;
  private final ClubJpaRepository clubJpaRepository;

  @Transactional
  public AnnouncementCreateResponse createAnnouncement(
      ClubRoleSecuredDto clubRoleSecuredDto, AnnouncementCreateRequest request) {
    // 1.Club 찾기

    // 2.Announcement 생성
    Announcement announcement = Announcement.initialize(request, clubRoleSecuredDto.clubId());

    Announcement savedAnnouncement = announcementRepository.save(announcement);

    return new AnnouncementCreateResponse(savedAnnouncement.getId());
  }

  @Transactional(readOnly = true)
  @ValidClub
  public List<AnnouncementGetAllResponse> findAllByClubId(String clubId) {
    // 1. 클럽 ID에 해당하는 모든 공고 조회
    List<Announcement> announcements = announcementRepository.findAllByClubId(clubId);

    // 2. 도메인 객체 목록을 응답 DTO 목록으로 변환
    return announcements.stream().map(AnnouncementGetAllResponse::from).toList();
  }

  @Transactional(readOnly = true)
  @ValidClub
  public AnnouncementGetDetailResponse findById(String clubId, String announcementId) {
    // 공고 ID로 공고 조회
    Announcement announcement = announcementRepository.findById(announcementId);

    // 도메인 객체를 상세 응답 DTO로 변환
    return AnnouncementGetDetailResponse.from(announcement);
  }

  @Transactional
  public AnnouncementUpdateResponse updateAnnouncement(
      ClubRoleSecuredDto clubRoleSecuredDto,
      AnnouncementUpdateRequest request,
      String announcementId) {
    Announcement updateAnnouncement =
        Announcement.of(request, announcementId, clubRoleSecuredDto.clubId());

    // 2. 업데이트된 Announcement 저장
    Announcement updatedAnnouncement = announcementRepository.save(updateAnnouncement);

    return AnnouncementUpdateResponse.from(updatedAnnouncement);
  }

  @Transactional
  public void updateAnnouncementStatus() {
    // 1. 삭제되지 않은 공고 불러오기
    List<Announcement> announcements = announcementRepository.findAllByIsDeleted(false);

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
}
