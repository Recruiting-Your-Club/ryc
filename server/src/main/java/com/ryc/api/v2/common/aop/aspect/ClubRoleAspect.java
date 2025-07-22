package com.ryc.api.v2.common.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.common.exception.code.PermissionErrorCode;
import com.ryc.api.v2.common.exception.custom.NoPermissionException;
import com.ryc.api.v2.role.service.ClubRoleService;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubRoleAspect {

  private final ClubRoleService clubRoleService;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.HasRole)")
  public void validateMemberRole(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    ClubRoleSecuredDto dto = extractParameters(joinPoint.getArgs());
    HasRole hasRole = signature.getMethod().getAnnotation(HasRole.class);

    switch (hasRole.value()) {
      case OWNER:
        if (!clubRoleService.hasOwnerRole(dto.adminId(), dto.clubId()))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_OWNER);
        break;
      case MEMBER:
        if (!clubRoleService.hasRole(dto.adminId(), dto.clubId()))
          throw new NoPermissionException(PermissionErrorCode.FORBIDDEN_NOT_CLUB_MEMBER);
        break;
    }
  }

  private ClubRoleSecuredDto extractParameters(Object[] args) {
    for (Object arg : args) {
      if (arg instanceof ClubRoleSecuredDto) {
        return (ClubRoleSecuredDto) arg;
      }
    }
    throw new IllegalArgumentException("ClubRoleSecuredDto 파라미터가 필요합니다.");
  }
}
