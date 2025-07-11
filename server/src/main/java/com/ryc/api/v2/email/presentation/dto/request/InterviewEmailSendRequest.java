package com.ryc.api.v2.email.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.Interview.domain.NumberOfPeopleByInterviewDate;

public record InterviewEmailSendRequest(
    @NotNull(message = "number of people by interview date shouldn't be null")
        List<
                @NotNull(message = "number of people by interview date shouldn't be null")
                NumberOfPeopleByInterviewDate>
            numberOfPeopleByInterviewDates,
    @NotNull(message = "email send request shouldn't be null") @Valid EmailSendRequest emailSendRequest) {

  @Override
  public List<NumberOfPeopleByInterviewDate> numberOfPeopleByInterviewDates() {
    return List.copyOf(numberOfPeopleByInterviewDates);
  }
}
