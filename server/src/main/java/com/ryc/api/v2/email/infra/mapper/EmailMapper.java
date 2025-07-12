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
        .senderId(email.getSenderId())
        .recipient(email.getRecipient())
        .subject(email.getSubject())
        .content(email.getContent())
        .clubId(email.getClubId())
        .announcementId(email.getAnnouncementId())
        .status(email.getStatus())
        .retryCount(email.getRetryCount())
        .build();
  }

  public static Email toDomain(EmailEntity emailEntity) {
    return Email.builder()
        .id(emailEntity.getId())
        .senderId(emailEntity.getSenderId())
        .recipient(emailEntity.getRecipient())
        .subject(emailEntity.getSubject())
        .content(emailEntity.getContent())
        .clubId(emailEntity.getClubId())
        .announcementId(emailEntity.getAnnouncementId())
        .status(emailEntity.getStatus())
        .retryCount(emailEntity.getRetryCount())
        .build();
  }
}
