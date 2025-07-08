package com.ryc.api.v2.common.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.club.business.ClubService;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubAspect {

  private final ClubService clubService;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.ValidClub)")
  public void validateClubId(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    String clubId = extractParameters(signature.getParameterNames(), joinPoint.getArgs());

    if (!clubService.isValidClubId(clubId)) {
      throw new ClubException(ClubErrorCode.CLUB_NOT_FOUND);
    }
  }

  private String extractParameters(String[] parameterNames, Object[] args) {
    for (int i = 0; i < parameterNames.length; i++) {
      if (parameterNames[i].equals("clubId")) {
        return (String) args[i];
      }
    }

    throw new IllegalStateException("clubId 파라미터가 필요합니다.");
  }
}
