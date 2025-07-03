package com.ryc.api.v2.role.infra;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.role.domain.RoleRepository;
import com.ryc.api.v2.role.domain.vo.ClubRole;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;
import com.ryc.api.v2.role.infra.jpa.RoleJpaRepository;
import com.ryc.api.v2.role.infra.mapper.RoleMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepository {

  private final RoleJpaRepository roleJpaRepository;

  @Override
  public ClubRole save(ClubRole clubRole) {
    ClubRoleEntity clubRoleEntity = RoleMapper.toEntity(clubRole);
    ClubRoleEntity savedClubRoleEntity = roleJpaRepository.save(clubRoleEntity);
    return RoleMapper.toDomain(savedClubRoleEntity);
  }

  @Override
  public boolean existsByAdminIdAndClubId(String adminId, String clubId) {
    return roleJpaRepository.existsByAdminIdAndClubId(adminId, clubId);
  }

  @Override
  public boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId) {
    return roleJpaRepository.existsOwnerRoleByAdminIdAndClubId(adminId, clubId);
  }

  @Override
  public void deleteByUserId(String adminId) {
    roleJpaRepository.deleteByAdminId(adminId);
  }
}
