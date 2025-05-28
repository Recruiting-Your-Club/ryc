package com.ryc.api.v2.announcement.domain;

import java.util.List;

public interface AnnouncementRepository {
    public Announcement save(Announcement announcement);

    /**
     *
     * @param clubId
     * @return 해당 Club의 Announcement List
     */
    public List<Announcement> findAllByClubId(String clubId);
}
