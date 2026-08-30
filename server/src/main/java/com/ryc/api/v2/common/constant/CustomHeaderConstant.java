package com.ryc.api.v2.common.constant;

public final class CustomHeaderConstant {

  public static final String CLUB_ID_HEADER_NAME = "X-CLUB-ID";
  public static final String EMAIL_VERIFICATION_CODE_HEADER_NAME = "X-EMAIL-VERIFICATION-CODE";
  public static final String IDEMPOTENCY_KEY_HEADER_NAME = "Idempotency-Key";

  private CustomHeaderConstant() {
    // Prevent instantiation
  }
}
