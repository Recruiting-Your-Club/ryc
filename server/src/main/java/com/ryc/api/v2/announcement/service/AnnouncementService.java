package com.ryc.api.v2.announcement.service;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    @Transactional(readOnly = true)
    public AnnouncementStatus getStatusByClubId(String clubId) {
        return AnnouncementStatus.UPCOMING;
    }
}
