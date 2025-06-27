package com.ryc.api.v2.email.infra.mapper;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.infra.entity.EmailEntity;

public class EmailMapper {

  private EmailMapper() {
    // Private constructor to prevent instantiation
  }

  public static EmailEntity toEntity(Email email) {
    return EmailEntity.builder()
        .id(email.id())
        .recipient(email.recipient())
        .subject(email.subject())
        .content(email.content())
        .announcementId(email.announcementId())
        .adminId(email.adminId())
        .status(email.status())
        .build();
  }
}
