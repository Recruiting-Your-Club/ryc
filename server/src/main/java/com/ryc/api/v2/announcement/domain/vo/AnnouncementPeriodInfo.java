package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AnnouncementPeriodInfo {
    private final Period applicationPeriod;
    private final Period interviewPeriod;
    private final Period resultAnnouncementPeriod;
    private final Period applicationResultPeriod;
}
