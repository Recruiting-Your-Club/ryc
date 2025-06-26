package com.ryc.api.v2.email.infra.mapper;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.infra.entity.EmailEntity;

public class EmailMapper {

  private EmailMapper() {
    // Private constructor to prevent instantiation
  }

  public static EmailEntity toEntity(Email email) {
    return EmailEntity.builder()
        .id(email.getId())
        .recipient(email.getRecipient())
        .subject(email.getSubject())
        .content(email.getContent())
        .announcementId(email.getAnnouncementId())
        .adminEmail(email.getAdminEmail())
        .build();
  }
}
