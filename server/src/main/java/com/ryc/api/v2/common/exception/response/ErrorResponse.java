package com.ryc.api.v2.common.exception.response;

import java.util.List;

import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
  private final String code;
  private final String message;

  @JsonInclude(JsonInclude.Include.NON_EMPTY)
  private final List<ValidationError> errors;

  @Builder
  public record ValidationError(String field, String message) {
    public static ValidationError of(final FieldError fieldError) {
      return ValidationError.builder()
          .field(fieldError.getField())
          .message(fieldError.getDefaultMessage())
          .build();
    }
  }
}
