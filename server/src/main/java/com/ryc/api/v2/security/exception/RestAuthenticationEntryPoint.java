package com.ryc.api.v2.security.exception;

import java.io.IOException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.ryc.api.v2.security.exception.custom.InvalidClaimException;
import com.ryc.api.v2.security.exception.custom.InvalidSignatureException;
import com.ryc.api.v2.security.exception.custom.MalformedTokenException;
import com.ryc.api.v2.security.exception.custom.TokenExpiredException;

import lombok.extern.slf4j.Slf4j;

/** 사용자 인증 실패 예외처리 엔트리 포인트 */
@Slf4j
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

  // TODO: GlobalExceptionHandler로 던저서 예외 응답 보내기
  @Override
  public void commence(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException authException)
      throws IOException {

    log.info("인증 실패 에러 메시지: {}", authException.getMessage());

    final String code;
    final String errorMessage;

    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    if (authException instanceof TokenExpiredException) {
      code = "TOKEN_EXPIRED";
      errorMessage = "Access token has expired.";
    } else if (authException instanceof InvalidSignatureException) {
      code = "INVALID_SIGNATURE";
      errorMessage = "Token signature is invalid.";
    } else if (authException instanceof MalformedTokenException) {
      code = "MALFORMED_TOKEN";
      errorMessage = "Token structure is malformed.";
    } else if (authException instanceof InvalidClaimException) {
      code = "INVALID_CLAIM";
      errorMessage = "Token claims are invalid.";
    } else {
      code = "UNAUTHORIZED";
      errorMessage = "Authentication credentials were missing or invalid.";
    }

    String jsonResponse =
        """
                        {
                          "code": "%s",
                          "message": "%s"
                        }
                        """
            .formatted(code, errorMessage);

    response.getWriter().write(jsonResponse);
  }
}
