package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;
import lombok.Getter;

import java.util.Objects;

@Builder
@Getter
public class AnnouncementPeriodInfo {
    private final Period applicationPeriod;
    private final Period interviewPeriod;
    private final Period resultAnnouncementPeriod;
    private final Period applicationResultPeriod;

    @Override
    public int hashCode() {
        return Objects.hash(applicationPeriod, interviewPeriod, resultAnnouncementPeriod, applicationResultPeriod);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        AnnouncementPeriodInfo announcementPeriodInfo = (AnnouncementPeriodInfo) obj;
        return Objects.equals(applicationPeriod, announcementPeriodInfo.applicationPeriod) &&
               Objects.equals(interviewPeriod, announcementPeriodInfo.interviewPeriod) &&
               Objects.equals(resultAnnouncementPeriod, announcementPeriodInfo.resultAnnouncementPeriod) &&
               Objects.equals(applicationResultPeriod, announcementPeriodInfo.applicationResultPeriod);
    }
}
