package com.ryc.api.v2.security.exception.custom;

import org.springframework.security.core.AuthenticationException;

/** 토큰 기한 만료시 발생 JWTVerificationException의 TokenExpiredException와 매핑 */
public class TokenExpiredException extends AuthenticationException {
  public TokenExpiredException(String msg, Throwable cause) {
    super(msg, cause);
  }
}
