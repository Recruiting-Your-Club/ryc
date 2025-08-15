package com.ryc.api.v2.email.service;

import java.util.List;

import com.ryc.api.v2.applicant.domain.Applicant;

import lombok.Builder;

@Builder
public record InterviewEmailEvent(
    List<Applicant> applicants,
    String subject,
    String content,
    String adminId,
    String clubId,
    String announcementId) {}
