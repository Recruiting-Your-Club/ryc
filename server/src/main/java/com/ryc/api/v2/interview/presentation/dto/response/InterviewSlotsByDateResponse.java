package com.ryc.api.v2.interview.presentation.dto.response;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotsByDateResponse(
    @Schema(description = "날짜") LocalDate date,
    @Schema(description = "날짜 별 면접 슬롯 정보") List<InterviewSlotResponse> interviewSlots) {

  public InterviewSlotsByDateResponse {
    if (interviewSlots != null) {
      interviewSlots =
          interviewSlots.stream()
              .sorted(Comparator.comparing(slot -> slot.period().startDate()))
              .toList();
    }
  }
}
