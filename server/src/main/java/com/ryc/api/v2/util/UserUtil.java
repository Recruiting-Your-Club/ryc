package com.ryc.api.v2.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ryc.api.v2.security.dto.CustomUserDetail;

public class UserUtil {
  private UserUtil() {}

  public static String getCurrentUserId() {
    CustomUserDetail userDetails = getCurrentUserDetails();
    return userDetails.getId();
  }

  public static String getCurrentUsername() {
    CustomUserDetail userDetails = getCurrentUserDetails();
    return userDetails.getUsername();
  }

  private static CustomUserDetail getCurrentUserDetails() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      throw new IllegalStateException("인증되지 않은 사용자입니다.");
    }

    Object principal = authentication.getPrincipal();

    if (!(principal instanceof CustomUserDetail)) {
      throw new IllegalStateException("principal 타입이 올바르지 않습니다.");
    }

    return (CustomUserDetail) principal;
  }
}
