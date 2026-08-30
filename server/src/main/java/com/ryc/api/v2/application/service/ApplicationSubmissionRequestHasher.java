package com.ryc.api.v2.application.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApplicationSubmissionRequestHasher {

  private final ObjectMapper objectMapper;

  public String hash(String announcementId, ApplicationSubmissionRequest request) {
    try {
      String serializedRequest = announcementId + ":" + objectMapper.writeValueAsString(request);
      byte[] digest =
          MessageDigest.getInstance("SHA-256")
              .digest(serializedRequest.getBytes(StandardCharsets.UTF_8));
      return toHex(digest);
    } catch (JsonProcessingException e) {
      throw new IllegalStateException("지원서 요청을 멱등키 fingerprint로 변환할 수 없습니다.", e);
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("SHA-256 알고리즘을 사용할 수 없습니다.", e);
    }
  }

  private String toHex(byte[] bytes) {
    StringBuilder hex = new StringBuilder(bytes.length * 2);
    for (byte value : bytes) {
      hex.append(String.format("%02x", value));
    }
    return hex.toString();
  }
}
