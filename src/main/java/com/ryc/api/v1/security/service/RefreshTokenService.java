package com.ryc.api.v1.security.service;

import com.ryc.api.v1.security.domain.RefreshToken;
import com.ryc.api.v1.user.domain.User;

import java.util.Optional;

public interface RefreshTokenService {
    void updateRefreshToken(User user, String newToken, long expirationMinutes);
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
    void deleteByUser(User user);
}
