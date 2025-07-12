package com.ryc.api.v2.Interview.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.Interview.domain.InterviewSlot;

import lombok.Builder;

@Builder
public record InterviewSlotsGetResponse(
    String clubId,
    String clubName,
    String clubCategory,
    String clubImageUrl,
    String clubThumbnailUrl,
    List<InterviewSlot> interviewSlots,
    String applicantEmail) {}
