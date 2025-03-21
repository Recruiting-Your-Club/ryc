package com.ryc.api.v1.auth.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ryc.api.v1.auth.dto.exception.InvalidRefreshTokenException;
import com.ryc.api.v1.auth.dto.exception.UnauthorizedUserException;
import com.ryc.api.v1.auth.dto.request.RefreshTokenRequest;
import com.ryc.api.v1.auth.dto.response.GenerateRefreshTokenResponse;
import com.ryc.api.v1.auth.service.RefreshTokenService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/token")
@RequiredArgsConstructor
@Tag(name = "token")
public class RefreshTokenController {

  private final RefreshTokenService refreshTokenService;

  @PostMapping("/refresh")
  public ResponseEntity<?> refreshAccessToken(@Valid @RequestBody RefreshTokenRequest request) {
    try {
      GenerateRefreshTokenResponse response =
          refreshTokenService.generateRefreshToken(request.refreshToken());
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (InvalidRefreshTokenException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    } catch (UnauthorizedUserException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
  }
}
