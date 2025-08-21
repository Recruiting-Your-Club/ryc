package com.ryc.api.v2.file.domain;

import java.util.Set;
import java.util.stream.Stream;

import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.file.common.constant.FileContentType;
import com.ryc.api.v2.file.common.constant.S3Prefix;
import com.ryc.api.v2.file.common.exception.code.S3ErrorCode;

import lombok.Getter;

@Getter
public enum FileDomainType {
  CLUB_PROFILE(FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.CLUB_PROFILE, false),
  CLUB_IMAGE(FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.CLUB_IMAGE, false),
  CLUB_POST_IMAGE(FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.CLUB_POST_IMAGE, false),
  ANNOUNCEMENT_IMAGE(FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.ANNOUNCEMENT_IMAGE, false),
  USER_PROFILE(FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.USER_PROFILE, true),
  ANNOUNCEMENT_POST_IMAGE(
      FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.ANNOUNCEMENT_POST_IMAGE, false),
  APPLICANT_PROFILE(FileContentType.IMAGE_CONTENT_TYPES, S3Prefix.APPLICANT_PROFILE, true),
  ANSWER_ATTACHMENT(
      FileContentType.ANSWER_ATTACHMENT_CONTENT_TYPES, S3Prefix.APPLICATION_ATTACHMENT, true),
  ;

  private final Set<String> allowedContentTypes;
  private final String prefix;
  private final Boolean isPrivate;

  FileDomainType(Set<String> allowedContentTypes, String prefix, Boolean isPrivate) {
    this.allowedContentTypes = allowedContentTypes;
    this.prefix = prefix;
    this.isPrivate = isPrivate;
  }

  /**
   * 해당 FileType에 허용된 contentType이 맞는지 확인
   *
   * @param contentType 검증할 파일의 contentType (ex: image/jpeg)
   * @throws BusinessRuleException contentType가 맞지 않을 때
   */
  public void checkContentType(String contentType) {
    if (contentType == null) {
      throw new BusinessRuleException(S3ErrorCode.REQUIRED_CONTENT_TYPE);
    }
    String lowCaseContentType = contentType.toLowerCase();

    if (!allowedContentTypes.contains(lowCaseContentType)) {
      throw new BusinessRuleException(
          S3ErrorCode.INVALID_CONTENT_TYPE, this.name(), lowCaseContentType, allowedContentTypes);
    }
  }

  /**
   * String to enum 정적 팩토리 메소드
   *
   * @param value enum value string
   * @return FileType
   */
  public static FileDomainType from(String value) {
    if (value == null) {
      return null;
    }
    return Stream.of(FileDomainType.values())
        .filter(fileDomainType -> fileDomainType.name().equalsIgnoreCase(value))
        .findFirst()
        .orElseThrow(() -> new BusinessRuleException(S3ErrorCode.INVALID_FILE_TYPE, value));
  }
}
