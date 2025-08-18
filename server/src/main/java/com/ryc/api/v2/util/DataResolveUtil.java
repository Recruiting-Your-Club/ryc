package com.ryc.api.v2.util;

public final class DataResolveUtil {
  private DataResolveUtil() {}

  /**
   * 문자열 정제 메소드
   *
   * @param string
   * @return null Or Trimed String
   */
  public static String sanitizeString(String string) {
    return string != null ? string.trim() : null;
  }

  /**
   * 이메일 정제 메소드 (trim + 소문자 변환)
   *
   * @param email
   * @return null Or Trimed and Lowercased Email
   */
  public static String sanitizeEmail(String email) {
    return email != null ? email.trim().toLowerCase() : null;
  }
}
