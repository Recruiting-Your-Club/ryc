package com.ryc.api.v2.announcement.domain;

import java.util.List;

import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;

/*
 * AnnouncementEntity는 Soft Delete를 지원합니다.
 * AnnouncementEntity를 조회할 때는 항상 isDeleted가 false인 것만 조회합니다.
 * AnnouncementEntity를 삭제할 때는 isDeleted를 true로 변경합니다.
 */
public interface AnnouncementRepository {
  /**
   * @param announcement
   * @return saved Announcement
   */
  Announcement save(Announcement announcement);

  /**
   * @param clubId
   * @return 해당 Club의 Announcement List
   */
  List<Announcement> findAllByClubId(String clubId);

  /**
   * @param announcementId announcementId
   * @return 해당 announcement의 Announcement (with Application)
   */
  Announcement findById(String announcementId);

  List<Announcement> findAll();

  void saveAll(List<Announcement> announcements);

  List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds);

  boolean imageAllowed(String announcementId);

  String findClubNameByAnnouncementId(String announcementId);

  List<String> findIdsByClubId(String clubId);

  void deleteAllByIdIn(List<String> announcementIds);
}
