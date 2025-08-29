package com.ryc.api.v2.common.deserializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class EmptyStringToNullLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

  private static final DateTimeFormatter FORMATTER =
      DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

  @Override
  public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
    String value = p.getText();

    if (value == null || value.trim().isEmpty()) {
      return null;
    }

    try {
      return LocalDateTime.parse(value, FORMATTER);
    } catch (Exception e) {
      throw new IllegalArgumentException(
          "Invalid date format: " + value + ". Expected format: yyyy-MM-ddTHH:mm");
    }
  }
}
