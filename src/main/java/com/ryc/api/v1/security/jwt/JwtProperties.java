package com.ryc.api.v1.security.jwt;

import com.ryc.api.v1.auth.domain.RefreshToken;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "jwt")
public final class JwtProperties {

    private final AccessToken accessToken;
    private final RefreshToken refreshToken;

    @Getter
    @RequiredArgsConstructor
    public static final class AccessToken {
        private final String issuer;
        private final String secretKey;
        private final long expirationMinute;
    }

    @Getter
    @RequiredArgsConstructor
    public static final class RefreshToken {
        private final String issuer;
        private final long expirationMinute;
    }

}
