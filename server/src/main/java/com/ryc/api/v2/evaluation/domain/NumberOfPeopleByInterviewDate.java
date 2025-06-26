package com.ryc.api.v2.evaluation.domain;

import java.time.LocalDateTime;

public record NumberOfPeopleByInterviewDate(LocalDateTime interviewDate, Integer numberOfPeople) {}
