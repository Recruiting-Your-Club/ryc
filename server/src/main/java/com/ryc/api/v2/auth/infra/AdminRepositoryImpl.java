package com.ryc.api.v2.auth.infra;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.domain.AdminRepository;
import com.ryc.api.v2.auth.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.auth.infra.mapper.AdminMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminRepositoryImpl implements AdminRepository {
  private final AdminJpaRepository adminJpaRepository;

  @Override
  public Admin save(Admin admin) {
    return AdminMapper.toDomain(adminJpaRepository.save(AdminMapper.toEntity(admin)));
  }

  @Override
  public boolean existsByEmail(String email) {
    return adminJpaRepository.existsByEmail(email);
  }

  @Override
  public Optional<Admin> findByEmail(String email) {
    return adminJpaRepository.findByEmail(email).map(AdminMapper::toDomain);
  }
}
