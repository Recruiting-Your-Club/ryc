package com.ryc.api.v2.auth.domain;

import java.util.Optional;

import com.ryc.api.v2.admin.domain.Admin;

public interface RefreshTokenRepository {
  RefreshToken save(RefreshToken refreshToken, Admin admin);

  Optional<Admin> findAdminByToken(String refreshToken);

  boolean deleteRefreshTokenByToken(String refreshToken);

  boolean deleteRefreshTokenByAdmin(Admin admin);

  void flush();
}
