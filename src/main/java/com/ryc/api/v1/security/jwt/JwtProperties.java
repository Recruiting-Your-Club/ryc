package com.ryc.api.v1.security.jwt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

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
