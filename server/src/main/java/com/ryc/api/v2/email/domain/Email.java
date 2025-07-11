package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record Email(
    String id,
    String senderId,
    String recipient,
    String subject,
    String content,
    String announcementId,
    EmailSentStatus status,
    Integer retryCount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  public static Email initialize(
      String senderId, String recipient, String subject, String content, String announcementId) {
    return Email.builder()
        .id(DEFAULT_INITIAL_ID)
        .senderId(senderId)
        .recipient(recipient)
        .subject(subject)
        .content(content)
        .announcementId(announcementId)
        .status(EmailSentStatus.PENDING)
        .retryCount(0)
        .build();
  }

  public Email updateStatus(EmailSentStatus status) {
    return Email.builder()
        .id(this.id)
        .senderId(this.senderId)
        .recipient(this.recipient)
        .subject(this.subject)
        .content(this.content)
        .announcementId(this.announcementId)
        .status(status)
        .retryCount(this.retryCount)
        .createdAt(this.createdAt)
        .updatedAt(this.updatedAt)
        .build();
  }

  public Email incrementRetryCount() {
    return Email.builder()
        .id(this.id)
        .senderId(this.senderId)
        .recipient(this.recipient)
        .subject(this.subject)
        .content(this.content)
        .announcementId(this.announcementId)
        .status(this.status)
        .retryCount(this.retryCount + 1)
        .createdAt(this.createdAt)
        .updatedAt(this.updatedAt)
        .build();
  }
}
