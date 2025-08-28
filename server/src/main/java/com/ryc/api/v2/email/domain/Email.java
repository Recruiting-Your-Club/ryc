package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

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

  @Builder
  private Email(
      String id,
      String senderId,
      String recipient,
      String subject,
      String content,
      String announcementId,
      EmailSentStatus status,
      Integer retryCount) {

    // 1. 정제
    String sanitizedRecipient = DataResolveUtil.sanitizeEmail(recipient);
    String sanitizedSubject = DataResolveUtil.sanitizeString(subject);
    String sanitizedContent = DataResolveUtil.sanitizeString(content);

    // 2. 선택 멤버 변수 기본값 처리
    Integer resolvedRetryCount = retryCount != null ? retryCount : 0;

    // 3. 검증
    EmailValidator.validate(
        id,
        senderId,
        sanitizedRecipient,
        sanitizedSubject,
        sanitizedContent,
        announcementId,
        status,
        resolvedRetryCount);

    // 4. 할당
    this.id = id;
    this.senderId = senderId;
    this.recipient = sanitizedRecipient;
    this.subject = sanitizedSubject;
    this.content = sanitizedContent;
    this.announcementId = announcementId;
    this.status = status;
    this.retryCount = resolvedRetryCount;
  }

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
