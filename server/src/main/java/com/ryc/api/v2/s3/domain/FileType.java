package com.ryc.api.v2.s3.domain;

import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.s3.common.exception.code.S3ErrorCode;

import java.util.Set;
import java.util.stream.Stream;

public enum FileType {
  CLUB_PROFILE(Set.of("image/jpeg", "image/png", "image/webp")),
  ANNOUNCEMENT_IMAGE(Set.of("image/jpeg", "image/png", "image/webp")),
  APPLICATION_ATTACHMENT(Set.of("image/jpeg", "image/png", "image/webp",
          // PDF
          "application/pdf"));

  private final Set<String> allowedContentTypes;

    FileType(Set<String> allowedContentTypes) {
        this.allowedContentTypes = allowedContentTypes;
    }

    /**
     * 해당 FileType에 허용된 contentType이 맞는지 확인
     *
     * @param contentType 검증할 파일의 contentType (ex: image/jpeg)
     * @throws BusinessRuleException contentType가 맞지 않을 때
     */
    public void checkContentType(String contentType) {
        if(contentType == null) {
            throw new BusinessRuleException(S3ErrorCode.REQUIRED_CONTENT_TYPE);
        }
        String lowCaseContentType = contentType.toLowerCase();

        if(!allowedContentTypes.contains(lowCaseContentType)) {
            throw new BusinessRuleException(S3ErrorCode.INVALID_CONTENT_TYPE ,this.name() ,lowCaseContentType, allowedContentTypes);
        }
    }

    /**
     * String to enum 정적 팩토리 메소드
     * @param value enum value string
     * @return FileType
     */
    public static FileType from(String value) {
        if (value == null) {
            return null;
        }
        return Stream.of(FileType.values())
                .filter(fileType -> fileType.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() ->new BusinessRuleException(S3ErrorCode.INVALID_FILE_TYPE, value));
    }
}
