package com.ryc.api.v2.auth.service;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.auth.domain.event.RefreshTokenIssuedEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenEventListener {
  private final AuthService authService;

  @EventListener
  public void handleRefreshTokenIssuedEvent(RefreshTokenIssuedEvent event) {
    authService.saveRefreshToken(event.adminId(), event.refreshToken(), event.expirationTime());
  }
}
