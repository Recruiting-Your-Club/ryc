package com.ryc.api.v2.Interview.domain;

import java.time.LocalDateTime;

public record NumberOfPeopleByInterviewDate(LocalDateTime interviewDate, Integer numberOfPeople) {}
