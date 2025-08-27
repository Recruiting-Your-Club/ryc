package com.ryc.api.v2.application.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import org.hibernate.validator.constraints.UUID;

import com.ryc.api.v2.common.validator.request.annotation.NullOrNotBlank;

import lombok.Builder;

@Builder
public record AnswerCreateRequest(
    @NotNull(message = "질문 아이디는 필수입니다.") @UUID(message = "질문 아이디는 UUID 포멧이어야 합니다.")
        String questionId,
    @NullOrNotBlank @Size(max = 5000, message = "질문 답변값은 5000자를 초과할 수 없습니다.") String textAnswer,
    @NullOrNotBlank @UUID(message = "fileMetadataId는 UUID 포멧을 준수해야 합니다.") String fileMetadataId,
    List<@NotNull(message = "객관식 응답항목 원소는 null일 수 없습니다.") @Valid AnswerChoiceCreateRequest>
        answerChoices) {
  public AnswerCreateRequest {
    answerChoices = answerChoices == null ? List.of() : answerChoices;
  }

  @Override
  public List<AnswerChoiceCreateRequest> answerChoices() {
    return List.copyOf(answerChoices);
  }
}
