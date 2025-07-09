package com.ryc.api.v2.security.exception.custom;

import org.springframework.security.core.AuthenticationException;

/**
 * 토큰의 Claim 값이 잘못된 경우 발생 JWTVerificationException의 InvalidClaimException, IncorrectClaimException,
 * MissingClaimException와 매핑
 */
public class InvalidClaimException extends AuthenticationException {
  public InvalidClaimException(String msg, Throwable cause) {
    super(msg, cause);
  }
}
