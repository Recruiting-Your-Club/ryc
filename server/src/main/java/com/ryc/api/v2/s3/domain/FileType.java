package com.ryc.api.v2.s3.domain;

import java.util.Set;

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

    public boolean isAllowedContentType(String contentType) {
        if(contentType == null) {
            return false;
        }
        String lowCaseContentType = contentType.toLowerCase();

        return allowedContentTypes.contains(lowCaseContentType);
    }
}
