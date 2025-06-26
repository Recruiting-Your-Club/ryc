package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Email {

  private String id;
  private String recipient;
  private String subject;
  private String content;
  private String clubId;
  private String adminEmail;

  public static Email initialize(
      String recipient, String subject, String content, String clubId, String adminEmail) {
    return Email.builder()
        .id(DEFAULT_INITIAL_ID)
        .recipient(recipient)
        .subject(subject)
        .content(content)
        .clubId(clubId)
        .adminEmail(adminEmail)
        .build();
  }
}
