package com.ryc.api.v2.common.aop.aspect;

import jakarta.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.common.exception.custom.NoPermissionException;
import com.ryc.api.v2.role.service.ClubRoleService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubRoleAspect {

  private final HttpServletRequest request;
  private final ClubRoleService clubRoleService;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.HasRole)")
  public void validateClubRole(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    HasRole hasRole = signature.getMethod().getAnnotation(HasRole.class);

    String clubId = extractClubId();
    String adminId = extractAdminId();

    switch (hasRole.value()) {
      case OWNER:
        if (!clubRoleService.hasOwnerRole(adminId, clubId))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_OWNER);
        break;
      case MEMBER:
        if (!clubRoleService.hasRole(adminId, clubId))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_MEMBER);
        break;
    }
  }

  private String extractClubId() {
    String header = request.getHeader("X-CLUB-ID");

    if (header == null) {
      throw new ClubException(ClubErrorCode.CLUB_ID_BAD_REQUEST);
    }
    return header;
  }

  private String extractAdminId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
    return userDetail.getId();
  }
}
