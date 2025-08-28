package com.ryc.api.v2.common.deserializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.custom.InvalidFormatException;

/** 종료 날짜용 Deserializer */
public class EndOfDayLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

  private static final DateTimeFormatter FORMATTER =
      DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

  @Override
  public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
    String value = p.getText();

    if (value == null || value.trim().isEmpty()) {
      return null;
    }

    try {
      LocalDateTime dateTime = LocalDateTime.parse(value, FORMATTER);
      return dateTime.toLocalDate().atTime(23, 59, 59); // 23:59:59
    } catch (Exception e) {
      // TODO: 메시지 추가
      throw new InvalidFormatException(CommonErrorCode.INVALID_PARAMETER);
    }
  }
}
