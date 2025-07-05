package com.ryc.api.v2.auth.domain;

public interface RefreshTokenRepository {
    RefreshToken save(RefreshToken refreshToken, Admin admin);
}
