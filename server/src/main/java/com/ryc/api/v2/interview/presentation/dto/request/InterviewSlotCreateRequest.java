package com.ryc.api.v2.interview.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.email.presentation.dto.request.EmailSendRequest;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotCreateRequest(
    @NotNull(message = "면접 날짜별 인원 수 정보는 null일 수 없습니다.")
        List<
                @NotNull(message = "면접 날짜별 인원 수 정보는 null일 수 없습니다.") @Valid
                NumberOfPeopleByInterviewDateRequest>
            numberOfPeopleByInterviewDateRequests,
    @Schema(description = "이메일 전송 요청 정보") @NotNull(message = "이메일 전송 요청 정보는 null일 수 없습니다.") @Valid
        EmailSendRequest emailSendRequest) {

  @Override
  @Schema(description = "면접 날짜별 인원 수 정보")
  public List<NumberOfPeopleByInterviewDateRequest> numberOfPeopleByInterviewDateRequests() {
    return List.copyOf(numberOfPeopleByInterviewDateRequests);
  }
}
