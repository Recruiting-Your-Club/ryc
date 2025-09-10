package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

final class EmailValidator extends DomainValidator {

  private EmailValidator() {}

  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");

  private static final int MAX_EMAIL_LENGTH = 320;
  private static final int MIN_EMAIL_LOCAL_PART_LENGTH = 1;
  private static final int MAX_EMAIL_LOCAL_PART_LENGTH = 64;
  private static final int MAX_EMAIL_DOMAIN_PART_LENGTH = 253;
  private static final int MIN_SUBJECT_LENGTH = 1;
  private static final int MAX_SUBJECT_LENGTH = 1000;
  private static final int MIN_CONTENT_LENGTH = 1;
  private static final int MAX_CONTENT_LENGTH = 10000;
  private static final int MIN_RETRY_COUNT = 0;
  private static final int MAX_RETRY_COUNT = 4;
  private static final String EMAIL_AT_SYMBOL = "@";

  static void validate(
      String id,
      String senderId,
      String recipient,
      String subject,
      String content,
      String announcementId,
      EmailSentStatus status,
      Integer retryCount) {

    validateId(id);
    validateSenderId(senderId);
    validateRecipient(recipient);
    validateSubject(subject);
    validateContent(content);
    validateAnnouncementId(announcementId);
    validateStatus(status);
    validateRetryCount(retryCount);
  }

  private static void validateId(String id) {
    validateNotNullOrEmpty(id, EMAIL_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, EMAIL_INVALID_ID_FORMAT);
  }

  private static void validateSenderId(String senderId) {
    validateNotNullOrEmpty(senderId, EMAIL_SENDER_ID_NULL_OR_EMPTY);
    validatePattern(senderId, UUID_PATTERN, EMAIL_INVALID_SENDER_ID_FORMAT);
  }

  /** RFC 5322 준수 Email */
  private static void validateRecipient(String recipient) {
    validateNotNullOrEmpty(recipient, EMAIL_RECIPIENT_NULL_OR_EMPTY);
    validateMaxLength(recipient, MAX_EMAIL_LENGTH, EMAIL_RECIPIENT_TOO_LONG);
    validateContains(recipient, EMAIL_AT_SYMBOL, EMAIL_RECIPIENT_MISSING_AT_SYMBOL);

    int atIndex = recipient.indexOf(EMAIL_AT_SYMBOL);
    String localPart = recipient.substring(0, atIndex);
    String domainPart = recipient.substring(atIndex + 1);

    validateLengthRange(
        localPart,
        MIN_EMAIL_LOCAL_PART_LENGTH,
        MAX_EMAIL_LOCAL_PART_LENGTH,
        EMAIL_RECIPIENT_LOCAL_PART_INVALID_LENGTH);

    validateNotNullOrEmpty(domainPart, EMAIL_RECIPIENT_DOMAIN_PART_NULL_OR_EMPTY);
    validateMaxLength(
        domainPart, MAX_EMAIL_DOMAIN_PART_LENGTH, EMAIL_RECIPIENT_DOMAIN_PART_TOO_LONG);

    validatePattern(recipient, EMAIL_PATTERN, EMAIL_INVALID_RECIPIENT_FORMAT);
  }

  private static void validateSubject(String subject) {
    validateNotNullOrEmpty(subject, EMAIL_SUBJECT_NULL_OR_EMPTY);
//    validateLengthRange(
//        subject, MIN_SUBJECT_LENGTH, MAX_SUBJECT_LENGTH, EMAIL_INVALID_SUBJECT_LENGTH);
  }

  private static void validateContent(String content) {
    validateNotNullOrEmpty(content, EMAIL_CONTENT_NULL_OR_EMPTY);
//    validateLengthRange(
//        content, MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH, EMAIL_INVALID_CONTENT_LENGTH);
  }

  private static void validateAnnouncementId(String announcementId) {
    validateNotNullOrEmpty(announcementId, EMAIL_ANNOUNCEMENT_ID_NULL_OR_EMPTY);
    validatePattern(announcementId, UUID_PATTERN, EMAIL_INVALID_ANNOUNCEMENT_ID_FORMAT);
  }

  private static void validateStatus(EmailSentStatus status) {
    validateNotNull(status, EMAIL_STATUS_NULL);
  }

  private static void validateRetryCount(Integer retryCount) {
    validateNotNull(retryCount, EMAIL_RETRY_COUNT_NULL);
    validateIntRange(retryCount, MIN_RETRY_COUNT, MAX_RETRY_COUNT, EMAIL_INVALID_RETRY_COUNT_RANGE);
  }
}
