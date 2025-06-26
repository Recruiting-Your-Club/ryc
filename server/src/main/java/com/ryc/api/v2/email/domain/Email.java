package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;

@Builder
public record Email(String id,
                    String recipient,
                    String subject,
                    String content,
                    String announcementId,
                    String adminEmail) {

  public static Email initialize(
      String recipient, String subject, String content, String announcementId, String adminEmail) {
    return Email.builder()
        .id(DEFAULT_INITIAL_ID)
        .recipient(recipient)
        .subject(subject)
        .content(content)
        .announcementId(announcementId)
        .adminEmail(adminEmail)
        .build();
  }
}
