package com.ryc.api.v2.application.domain;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class Answer {
    private final String id;
    private final String questionId;
    private final String answerText;
    private final List<AnswerChoice> choices;
    private final String fileMetadataId;
}