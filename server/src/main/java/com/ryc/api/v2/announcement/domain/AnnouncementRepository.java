package com.ryc.api.v2.announcement.domain;

import java.util.List;

import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;

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

  List<Announcement> findAllByIsDeleted(Boolean isDeleted);

  void saveAll(List<Announcement> announcements);

  List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds);
}
