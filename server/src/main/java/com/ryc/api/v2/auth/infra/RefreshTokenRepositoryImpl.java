package com.ryc.api.v2.auth.infra;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.infra.mapper.AdminMapper;
import com.ryc.api.v2.auth.domain.RefreshToken;
import com.ryc.api.v2.auth.domain.RefreshTokenRepository;
import com.ryc.api.v2.auth.infra.jpa.RefreshTokenJpaRepository;
import com.ryc.api.v2.auth.infra.mapper.RefreshTokenMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
  private final RefreshTokenJpaRepository refreshTokenJpaRepository;

  @Override
  public RefreshToken save(RefreshToken refreshToken, Admin admin) {
    return RefreshTokenMapper.toDomain(
        refreshTokenJpaRepository.save(
            RefreshTokenMapper.toEntity(refreshToken, AdminMapper.toEntity(admin))));
  }

  @Override
  public Optional<Admin> findAdminByToken(String refreshToken) {
    return refreshTokenJpaRepository
        .findByToken(refreshToken)
        .map(entity -> AdminMapper.toDomain(entity.getAdminEntity()));
  }

  @Override
  public boolean deleteRefreshTokenByToken(String refreshToken) {
    int deletedRows = refreshTokenJpaRepository.deleteByToken(refreshToken);
    return deletedRows > 0;
  }

  @Override
  public boolean deleteRefreshTokenByAdmin(Admin admin) {
    int deletedRows = refreshTokenJpaRepository.deleteByAdminEntity(AdminMapper.toEntity(admin));
    return deletedRows > 0;
  }

  @Override
  public void flush() {
    refreshTokenJpaRepository.flush();
  }
}
