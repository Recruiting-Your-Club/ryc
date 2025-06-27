package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record Email(
    String id,
    String recipient,
    String subject,
    String content,
    String announcementId,
    String adminId,
    EmailSentStatus status,
    Integer retryCount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
    ) {

  public static Email initialize(
      String recipient, String subject, String content, String announcementId, String adminId) {
    return Email.builder()
        .id(DEFAULT_INITIAL_ID)
        .recipient(recipient)
        .subject(subject)
        .content(content)
        .announcementId(announcementId)
        .adminId(adminId)
        .status(EmailSentStatus.PENDING)
        .retryCount(0)
        .createdAt(LocalDateTime.now())
        .updatedAt(null)
        .build();
  }

  public Email updateStatus(EmailSentStatus status) {
    return Email.builder()
        .id(this.id)
        .recipient(this.recipient)
        .subject(this.subject)
        .content(this.content)
        .announcementId(this.announcementId)
        .adminId(this.adminId)
        .status(status)
        .build();
  }
}
