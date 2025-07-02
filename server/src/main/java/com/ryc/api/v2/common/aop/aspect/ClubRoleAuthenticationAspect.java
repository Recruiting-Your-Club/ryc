package com.ryc.api.v2.common.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.common.exception.custom.NoPermissionException;
import com.ryc.api.v2.role.business.RoleService;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubRoleAuthenticationAspect {

  private final RoleService roleService;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.HasRole)")
  public void validateMemberRole(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    ClubRoleSecuredDto dto = extractParameters(signature.getParameterNames(), joinPoint.getArgs());
    HasRole hasRole = signature.getMethod().getAnnotation(HasRole.class);

    switch (hasRole.value()) {
      case OWNER:
        if (!roleService.hasOwnerRole(dto.adminId(), dto.clubId()))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_OWNER);
        break;
      case MEMBER:
        if (!roleService.hasRole(dto.adminId(), dto.clubId()))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_MEMBER);
        break;
    }
  }

  private ClubRoleSecuredDto extractParameters(String[] parameterNames, Object[] args) {
    String adminId = null;
    String clubId = null;

    for (int i = 0; i < parameterNames.length; i++) {
      if ("userDetail".equals(parameterNames[i])) {
        adminId = (String) args[i];
      } else if ("clubId".equals(parameterNames[i])) {
        clubId = (String) args[i];
      }
    }

    if (adminId == null || clubId == null) {
      throw new IllegalArgumentException("필수 파라미터 누락: adminId 또는 clubId");
    }

    return new ClubRoleSecuredDto(adminId, clubId);
  }
}
