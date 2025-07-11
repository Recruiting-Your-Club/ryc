package com.ryc.api.v2.security.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import lombok.RequiredArgsConstructor;

/** Access Denied 예외 핸들러 */
@RequiredArgsConstructor
@Component
public class TokenAccessDeniedHandler implements AccessDeniedHandler {
  private final HandlerExceptionResolver handlerExceptionResolver;

  @Override
  public void handle(
      HttpServletRequest request,
      HttpServletResponse response,
      AccessDeniedException accessDeniedException) {
    handlerExceptionResolver.resolveException(request, response, null, accessDeniedException);
  }
}
