package com.ryc.api.v2.common.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.common.exception.custom.NoPermissionException;
import com.ryc.api.v2.role.business.RoleService;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubRoleAuthenticationAspect {

  private final RoleService roleService;

  private record ParsedParameters(CustomUserDetail userDetail, String clubId) {}

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.HasRole)")
  public void validateMemberRole(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    ParsedParameters parameters = extractParameters(signature, joinPoint.getArgs());
    HasRole hasRole = signature.getMethod().getAnnotation(HasRole.class);

    switch (hasRole.value()) {
      case OWNER:
        if (!roleService.hasOwnerRole(parameters.userDetail.getId(), parameters.clubId))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_OWNER);
        break;
      case MEMBER:
        if (!roleService.hasRole(parameters.userDetail.getId(), parameters.clubId))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_MEMBER);
        break;
    }
  }

  private ParsedParameters extractParameters(MethodSignature signature, Object[] args) {
    String[] parameterNames = signature.getParameterNames();
    CustomUserDetail userDetail = null;
    String clubId = null;

    for (int i = 0; i < parameterNames.length; i++) {
      if ("userDetail".equals(parameterNames[i])) {
        userDetail = (CustomUserDetail) args[i];
      } else if ("clubId".equals(parameterNames[i])) {
        clubId = (String) args[i];
      }
    }

    if (userDetail == null || clubId == null) {
      throw new IllegalArgumentException("필수 파라미터 누락: userDetail 또는 clubId");
    }

    return new ParsedParameters(userDetail, clubId);
  }
}
