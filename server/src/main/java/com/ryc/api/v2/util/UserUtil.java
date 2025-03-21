package com.ryc.api.v2.util;

import com.ryc.api.v1.security.dto.CustomUserDetail;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtil {
    private UserUtil() {}

    public static String getCurrentUserId() {
        CustomUserDetail userDetails = getCurrentUserDetails();
        return (userDetails != null) ? userDetails.getId() : null;
    }

    public static String getCurrentUsername() {
        CustomUserDetail userDetails = getCurrentUserDetails();
        return (userDetails != null) ? userDetails.getUsername() : null;
    }

    private static CustomUserDetail getCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetail) {
            return (CustomUserDetail) principal;
        }
        return null;
    }
}