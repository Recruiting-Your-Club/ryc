package com.ryc.api.v2.application.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnswerChoice {
    private final String id;
    private final String optionId;
}
