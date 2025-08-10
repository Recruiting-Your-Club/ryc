package com.ryc.api.v2.interview.domain;

import java.time.LocalDateTime;

public record NumberOfPeopleByInterviewDate(LocalDateTime interviewDate, Integer numberOfPeople) {}
