package com.ryc.api.v2.application.domain;

import lombok.Builder;
import lombok.Getter;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class Application {

    private final String id;
    private final String applicantId;
    private final List<Answer> answers;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
}
