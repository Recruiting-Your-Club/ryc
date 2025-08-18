package com.ryc.api.v2.security.exception.custom;

import org.springframework.security.core.AuthenticationException;

/**
 * 토큰 형식 자체가 잘못 되었거나 알고리즘이 다를 경우(해킹시도 의심) 발생 JWTVerificationException의 JWTDecodeException,
 * AlgorithmMismatchException 발생시 매핑
 */
public class MalformedTokenException extends AuthenticationException {
  public MalformedTokenException(String msg, Throwable cause) {
    super(msg, cause);
  }
}
