package com.ryc.api.v2.announcement.infra.entity;

import jakarta.persistence.Embeddable;

import java.time.LocalDateTime;

@Embeddable
public class AnnouncementPeriod {
    private LocalDateTime applicationStartDate;
    private LocalDateTime applicationEndDate;

    private LocalDateTime interviewStartDate;
    private LocalDateTime interviewEndDate;

    private LocalDateTime resultAnnouncementDate;

}
