package com.ryc.api.v2.announcement.domain;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import lombok.Builder;
import lombok.Getter;

import java.util.LinkedHashSet;
import java.util.List;

@Getter
@Builder
public class Announcement {
    private final String id;
    private final String title;
    private final String numberOfPeople;
    private final String Description;
    private final String target;
    private final List<Tag> tags;
    private final List<Image> images;
    private final AnnouncementStatus announcementStatus;

    private final AnnouncementPeriodInfo announcementPeriod;

    private final AnnouncementApplication announcementApplication;

    private final String activityPeriod;

}
