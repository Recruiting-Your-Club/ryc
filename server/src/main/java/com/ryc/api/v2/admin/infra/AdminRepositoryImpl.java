package com.ryc.api.v2.admin.infra;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.admin.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.admin.infra.mapper.AdminMapper;
import com.ryc.api.v2.admin.infra.projection.AdminIdNameProjection;

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
  public Admin findByEmail(String email) {
    return adminJpaRepository
        .findByEmail(email)
        .map(AdminMapper::toDomain)
        .orElseThrow(() -> new UsernameNotFoundException("admin not found"));
  }

  @Override
  public Admin findById(String id) {
    return adminJpaRepository
        .findById(id)
        .filter(a -> !a.getIsDeleted())
        .map(AdminMapper::toDomain)
        .orElseThrow(() -> new NoSuchElementException("Admin not found with id: " + id));
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

  @Override
  public void deleteById(String adminId) {
    adminJpaRepository.deleteById(adminId);
  }
}
