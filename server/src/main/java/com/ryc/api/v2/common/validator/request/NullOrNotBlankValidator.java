package com.ryc.api.v2.common.validator.request;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.ryc.api.v2.common.validator.request.annotation.NullOrNotBlank;

public class NullOrNotBlankValidator implements ConstraintValidator<NullOrNotBlank, String> {
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return value == null || !value.trim().isEmpty();
  }
}
