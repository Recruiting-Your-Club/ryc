package com.ryc.api.v2.admin.infra;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.admin.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.admin.infra.mapper.AdminMapper;
import com.ryc.api.v2.admin.infra.projection.AdminIdNameProjection;
import com.ryc.api.v2.admin.infra.projection.AdminIdThumbnailProjection;

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

  @Override
  public Optional<Admin> findById(String id) {
    return adminJpaRepository.findById(id).map(AdminMapper::toDomain);
  }

  @Override
  public Map<String, String> findThumbnailUrlByIds(List<String> adminIds) {
    if (adminIds == null || adminIds.isEmpty()) {
      throw new IllegalArgumentException("adminIds must not be null or empty.");
    }

    return adminJpaRepository.findThumbnailUrlByIds(adminIds).stream()
        .filter(projection -> projection.getId() != null && projection.getThumbnailUrl() != null)
        .collect(
            Collectors.toMap(
                AdminIdThumbnailProjection::getId, AdminIdThumbnailProjection::getThumbnailUrl));
  }

  @Override
  public Map<String, String> findAdminNamesByIds(List<String> adminIds) {
    if (adminIds == null || adminIds.isEmpty()) {
      throw new IllegalArgumentException("adminIds must not be null or empty.");
    }

    return adminJpaRepository.findIdAndNameByIds(adminIds).stream()
        .filter(projection -> projection.getId() != null && projection.getName() != null)
        .collect(Collectors.toMap(AdminIdNameProjection::getId, AdminIdNameProjection::getName));
  }
}
