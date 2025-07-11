package com.ryc.api.v2.Interview.domain;

import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;

public record NumberOfPeopleByInterviewDate(
    PeriodRequest interviewPeriod, Integer numberOfPeople) {}
