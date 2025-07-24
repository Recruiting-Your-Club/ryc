package com.ryc.api.v2.applicant.domain;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Applicant {
    private final String id;
    private final String userId;
    private final String announcementId;
    private final ApplicantStatus status;
    private final Boolean isDeleted;
    private final String name;
    private final String email;
}
