package com.ryc.api.v2.announcement.infra;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.infra.jpa.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class AnnouncementRepositoryImpl implements AnnouncementRepository {
    private final AnnouncementJpaRepository announcementJpaRepository;
    private final AnnouncementFormJpaRepository announcementFormJpaRepository;

    @Override
    public Announcement save(Announcement announcement) {

        return null;
    }
}
