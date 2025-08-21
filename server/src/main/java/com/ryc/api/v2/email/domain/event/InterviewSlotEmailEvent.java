package com.ryc.api.v2.email.domain.event;

import java.util.List;

import com.ryc.api.v2.applicant.domain.Applicant;

import lombok.Builder;

@Builder
public record InterviewSlotEmailEvent(
    List<Applicant> applicants,
    String subject,
    String content,
    String adminId,
    String clubId,
    String announcementId) {}
