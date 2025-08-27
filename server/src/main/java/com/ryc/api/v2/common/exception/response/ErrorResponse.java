package com.ryc.api.v2.common.exception.response;

import java.util.List;

import jakarta.validation.ConstraintViolation;

import org.springframework.validation.FieldError;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
  @JsonInclude(JsonInclude.Include.NON_EMPTY)
  private final String code;

  @JsonInclude(JsonInclude.Include.NON_EMPTY)
  private final String message;

  @JsonInclude(JsonInclude.Include.NON_EMPTY)
  private final List<ValidationError> errors;

  @Builder
  public record ValidationError(String code, String message) {
    public static ValidationError of(final ConstraintViolation<?> violation, ErrorCode code) {
      return ValidationError.builder().code(code.name()).message(violation.getMessage()).build();
    }

    public static ValidationError of(final FieldError fieldError, ErrorCode code) {
      return ValidationError.builder()
          .code(code.name())
          .message(fieldError.getDefaultMessage())
          .build();
    }
  }
}
