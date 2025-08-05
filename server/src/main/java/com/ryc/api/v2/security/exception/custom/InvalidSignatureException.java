package com.ryc.api.v2.security.exception.custom;

import org.springframework.security.core.AuthenticationException;

/** 서명이 잘못 된 경우 발생 JWTVerificationException의 SignatureVerificationException와 매핑 */
public class InvalidSignatureException extends AuthenticationException {
  public InvalidSignatureException(String msg, Throwable cause) {
    super(msg, cause);
  }
}
