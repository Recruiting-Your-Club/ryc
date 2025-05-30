package com.ryc.api.v2.announcement.infra.converter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

/** List<String>을 JSON 문자열로 변환하고, JSON 문자열을 List<String>으로 변환하는 Converter */
@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {
  private static final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(List<String> attribute) {
    try {
      return attribute != null ? objectMapper.writeValueAsString(attribute) : null;
      //직렬화 문제 시 빈 값으로 반환
    } catch (JsonProcessingException e) {
      return "[]";
    }
  }

  @Override
  public List<String> convertToEntityAttribute(String dbData) {
    if (dbData == null || dbData.isEmpty()) {
      return new ArrayList<>();
    }

    try {
      //제네릭 명시를 위한 TypeReference 정의
      return objectMapper.readValue(dbData, new TypeReference<List<String>>() {});
      //빈 리스트로 반환
    } catch (IOException e) {
      return new ArrayList<>();
    }
  }
}
