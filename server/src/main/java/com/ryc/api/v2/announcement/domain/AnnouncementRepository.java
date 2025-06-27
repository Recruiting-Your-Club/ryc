package com.ryc.api.v2.announcement.domain;

import java.util.List;
import java.util.Map;

import com.ryc.api.v2.club.infra.entity.ClubEntity;

public interface AnnouncementRepository {
  /**
   * @param announcement
   * @return saved Announcement
   */
  public Announcement save(Announcement announcement, ClubEntity club);

  /**
   * @param clubId
   * @return 해당 Club의 Announcement List
   */
  public List<Announcement> findAllByClubId(String clubId);

  /**
   * @param id announcementId
   * @return 해당 announcement의 Announcement (with Application)
   */
  public Announcement findByIdWithApplication(String id);

  public List<Announcement> findAllByIsDeleted(Boolean isDeleted);

  void saveAll(List<Announcement> announcements, Map<String, ClubEntity> clubs);
}
