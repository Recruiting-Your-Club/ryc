package com.ryc.api.v2.auth.presentation;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ryc.api.v2.auth.presentation.request.LoginRequest;
import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.presentation.response.RegisterResponse;
import com.ryc.api.v2.auth.presentation.response.TokenRefreshResponse;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.auth.service.dto.TokenRefreshResult;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.validator.request.annotation.JWT;
import com.ryc.api.v2.security.jwt.JwtProperties;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v2/auth")
@RequiredArgsConstructor
@Validated
@Tag(name = "인증/인가")
public class AuthController {
  private final AuthService authService;
  private final JwtProperties jwtProperties;

  @PostMapping("/login")
  @Operation(summary = "Login", description = "사용자 로그인 인증 후, 인증 성공시 토큰 발행")
  public void login(@RequestBody LoginRequest loginRequest) {
    // 이 메서드는 실제로 작동하지 않습니다.
    // UsernamePasswordAuthenticationFilter가 이 경로를 가로채어 인증을 처리합니다.
    throw new IllegalStateException(
        "This method should not be called. It's handled by Spring Security filter chain.");
  }

  @PostMapping("/register")
  // TODO: DuplicateKeyException에 대한 예외 응답 코드 설정 필요
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"INVALID_PARAMETER"})
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest body) {
    RegisterResponse response = authService.register(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping("/refresh-token")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<?> refreshToken(
      @CookieValue("refresh-token") @NotBlank(message = "기존 리프레시 토큰은 빈값일 수 없습니다.") @JWT
          String refreshToken) {
    TokenRefreshResult refreshResult = authService.refreshToken(refreshToken);

    TokenRefreshResponse response = new TokenRefreshResponse(refreshResult.accessToken());
    ResponseCookie cookie =
        ResponseCookie.from("refresh-token", refreshResult.refreshToken())
            .httpOnly(true)
            .secure(true)
            .path("/api/v2/auth")
            .maxAge(jwtProperties.getRefreshToken().getExpirationMinute() * 60L)
            .sameSite("None")
            .build();

    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(response);
  }

  @PostMapping("/logout")
  @ApiErrorCodeExample(
      value = {CommonErrorCode.class},
      include = {"RESOURCE_NOT_FOUND"})
  public ResponseEntity<?> logout(
      @CookieValue(value = "refresh-token", required = false)
          @NotBlank(message = "기존 리프레시 토큰은 빈값일 수 없습니다.")
          @JWT
          String refreshToken) {
    if (refreshToken != null) {
      authService.logout(refreshToken);
    }

    ResponseCookie deleteCookie =
        ResponseCookie.from("refresh-token", "")
            .httpOnly(true)
            .secure(true)
            .path("/api/v2/auth")
            .maxAge(0)
            .sameSite("None")
            .build();

    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
        .body("Logout successful"); // TODO: 성공 메시지 포멧 통일화
  }
}
