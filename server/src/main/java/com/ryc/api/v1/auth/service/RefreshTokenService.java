package com.ryc.api.v1.auth.service;

import java.util.Optional;

import com.ryc.api.v1.auth.domain.RefreshToken;
import com.ryc.api.v1.auth.dto.response.GenerateRefreshTokenResponse;
import com.ryc.api.v1.user.domain.User;

public interface RefreshTokenService {

  GenerateRefreshTokenResponse generateRefreshToken(String refreshToken);

  void updateRefreshToken(User user, String newToken, long expirationMinutes);

  Optional<RefreshToken> findByToken(String token);

  void deleteByToken(String token);

  void deleteByUser(User user);
}
