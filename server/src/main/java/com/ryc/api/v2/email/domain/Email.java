package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Email {

  private final String id;
  private final String senderId;
  private final String recipient;
  private final String subject;
  private final String content;
  private final String announcementId;
  private final EmailSentStatus status;
  private final Integer retryCount;

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
        .build();
  }
}
