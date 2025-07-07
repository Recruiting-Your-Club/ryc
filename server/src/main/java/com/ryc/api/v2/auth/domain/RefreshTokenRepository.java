package com.ryc.api.v2.auth.domain;

import com.ryc.api.v2.admin.domain.Admin;

public interface RefreshTokenRepository {
  RefreshToken save(RefreshToken refreshToken, Admin admin);
}
