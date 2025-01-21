package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.domain.RefreshToken;
import com.ryc.api.v1.auth.dto.response.GenerateRefreshTokenResponse;
import com.ryc.api.v1.user.domain.User;

import java.util.Optional;

public interface RefreshTokenService {

    GenerateRefreshTokenResponse generateRefreshToken(String refreshToken);
    void updateRefreshToken(User user, String newToken, long expirationMinutes);
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
    void deleteByUser(User user);

}
