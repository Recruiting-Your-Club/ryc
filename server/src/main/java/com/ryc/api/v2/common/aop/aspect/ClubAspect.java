package com.ryc.api.v2.common.aop.aspect;

import java.util.NoSuchElementException;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.club.service.ClubQueryService;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubAspect {

  private final ClubQueryService clubQueryService;

  @Before("@annotation(com.ryc.api.v2.common.aop.annotation.ValidClub)")
  public void validateClubId(JoinPoint joinPoint) {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    String clubId = extractParameters(signature.getParameterNames(), joinPoint.getArgs());

    if (!clubQueryService.existClubById(clubId)) {
      throw new NoSuchElementException("동아리를 찾을 수 없습니다.");
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
