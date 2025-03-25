package com.ryc.api.v2.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "jwt")
public final class JwtProperties {
  private final AccessToken accessToken;

  @Getter
  @RequiredArgsConstructor
  public static final class AccessToken {
    private final String issuer;
    private final String secretKey;
    private final long expirationMinute;
  }
}
