package com.ryc.api.v2.role.infra;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.role.domain.Role;
import com.ryc.api.v2.role.domain.RoleRepository;
import com.ryc.api.v2.role.infra.entity.RoleEntity;
import com.ryc.api.v2.role.infra.jpa.RoleJpaRepository;
import com.ryc.api.v2.role.infra.mapper.RoleMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepository {

  private final RoleJpaRepository roleJpaRepository;

  @Override
  public Role save(Admin admin, Club club, Role role) {
    RoleEntity roleEntity = RoleMapper.toEntity(role, club, admin);
    return roleJpaRepository.save(roleEntity).getRole();
  }
}
