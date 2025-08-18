package com.ryc.api.v2.file.common.constant;

import java.util.Set;

public class FileContentType {
  public static final Set<String> IMAGE_CONTENT_TYPES =
      Set.of("image/jpeg", "image/png", "image/webp");

  public static final Set<String> ANSWER_ATTACHMENT_CONTENT_TYPES =
      Set.of("image/jpeg", "image/png", "image/webp", "application/pdf");
}
