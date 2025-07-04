package com.ryc.api.v2.announcement.domain;

import java.util.List;

import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;

public interface AnnouncementRepository {
  /**
   * @param announcement
   * @return saved Announcement
   */
  public Announcement save(Announcement announcement);

  /**
   * @param clubId
   * @return 해당 Club의 Announcement List
   */
  public List<Announcement> findAllByClubId(String clubId);

  /**
   * @param id announcementId
   * @return 해당 announcement의 Announcement (with Application)
   */
  public Announcement findById(String announcementId);

  public List<Announcement> findAllByIsDeleted(Boolean isDeleted);

  void saveAll(List<Announcement> announcements);

  List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds);
}
