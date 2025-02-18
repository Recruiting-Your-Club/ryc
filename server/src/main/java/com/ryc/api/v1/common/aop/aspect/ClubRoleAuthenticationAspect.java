package com.ryc.api.v1.common.aop.aspect;

import java.lang.reflect.Field;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.ryc.api.v1.common.aop.service.ClubRoleAuthenticationService;
import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;
import com.ryc.api.v1.common.exception.code.PermisssionErrorCode;
import com.ryc.api.v1.common.exception.custom.NoPermissionException;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class ClubRoleAuthenticationAspect {
  private final ClubRoleAuthenticationService clubRoleAuthenticationService;

  /** 회장 자격 검증 */
  // GET,PATCH 요청 처리: clubId가 @RequestParam으로 전달된 경우
  @Before(
      "(isPresidentRoleSecured() && isGetRequest() && args(clubId,..)) "
          + "|| (isPresidentRoleSecured() && isPatchRequest() && args(clubId,..))")
  public void checkPresidentRoleForGet(String clubId) {
    validateClubRole(clubId, ClubRole.PRESIDENT);
  }

  // POST 요청 처리: clubId가 @RequestBody로 전달된 경우
  @Before("isPresidentRoleSecured() && isPostRequest() && args(body)")
  public void checkPresidentRoleForPost(Object body) {
    try {
      Field clubRoleField = body.getClass().getDeclaredField("clubRoleSecuredDto");
      clubRoleField.setAccessible(true);
      Object clubRoleSecuredDto = clubRoleField.get(body);

      if (clubRoleSecuredDto != null) {
        validateClubRole(((ClubRoleSecuredDto) clubRoleSecuredDto).clubId(), ClubRole.PRESIDENT);
      } else {
        throw new IllegalArgumentException("clubRoleSecuredDto field should not be null.");
      }
    } catch (NoSuchFieldException | IllegalAccessException e) {
      // 필드가 없거나 접근할 수 없을 때 예외 처리
      throw new IllegalArgumentException(
          "The request body must contain a field named 'clubRoleSecuredDto'.", e);
    }
  }

  /** 회장 또는 동아리원인지 자격 검증 */
  // GET, PATCH 요청 처리: clubId가 @RequestParam으로 전달된 경우
  @Before(
      "isAnyRoleSecured() && isGetRequest() && args(clubId,..)"
          + "|| isAnyRoleSecured() && isPatchRequest() && args(clubId,..)")
  public void checkClubRoleForGet(String clubId) {
    validateAnyClubRole(clubId);
  }

  // POST 요청 처리: clubId가 @RequestBody로 전달된 경우
  @Before("isAnyRoleSecured() && isPostRequest() && args(body)")
  public void checkClubRoleForPost(Object body) {
    try {
      Field clubRoleField = body.getClass().getDeclaredField("clubRoleSecuredDto");
      clubRoleField.setAccessible(true);
      Object clubRoleSecuredDto = clubRoleField.get(body);

      if (clubRoleSecuredDto != null) {
        validateAnyClubRole(((ClubRoleSecuredDto) clubRoleSecuredDto).clubId());
      } else {
        throw new IllegalArgumentException("clubRoleSecuredDto field should not be null.");
      }
    } catch (NoSuchFieldException | IllegalAccessException e) {
      // 필드가 없거나 접근할 수 없을 때 예외 처리
      throw new IllegalArgumentException(
          "The request body must contain a field named 'clubRoleSecuredDto'.", e);
    }
  }

  // Pointcut: HasPresidentRoleSecured 어노테이션에서만 실행
  @Pointcut("@annotation(com.ryc.api.v1.common.aop.annotation.HasPresidentRoleSecured)")
  public void isPresidentRoleSecured() {}

  // Pointcut: HasAnyRoleSecured 어노테이션에서만 실행
  @Pointcut("@annotation(com.ryc.api.v1.common.aop.annotation.HasAnyRoleSecured)")
  public void isAnyRoleSecured() {}

  // Pointcut: GET 요청에서만 실행
  @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
  public void isGetRequest() {}

  // Pointcut: POST 요청에서만 실행
  @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)")
  public void isPostRequest() {}

  // Pointcut: PATCH 요청에서만 실행
  @Pointcut("@annotation(org.springframework.web.bind.annotation.PatchMapping)")
  public void isPatchRequest() {}

  // 동아리 내 특정 권한 확인 공통로직
  private void validateClubRole(String clubId, ClubRole clubRole) {
    CustomUserDetail userDetails =
        (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String userId = userDetails.getId();

    if (!clubRoleAuthenticationService.hasClubRole(userId, clubId, clubRole)) {
      if (clubRole == ClubRole.PRESIDENT)
        throw new NoPermissionException(PermisssionErrorCode.FORBIDDEN_NOT_CLUB_PRESIDENT);
      if (clubRole == ClubRole.MEMBER)
        throw new NoPermissionException(PermisssionErrorCode.FORBIDDEN_NOT_CLUB_MEMBER);
    }
  }

  // 동아리 내 권한 유무 확인 공통로직
  private void validateAnyClubRole(String clubId) {
    CustomUserDetail userDetails =
        (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String userId = userDetails.getId();

    if (!clubRoleAuthenticationService.hasAnyClubRole(userId, clubId))
      throw new NoPermissionException(PermisssionErrorCode.FORBIDDEN_NOT_CLUB_ANY_ROLE);
  }
}
