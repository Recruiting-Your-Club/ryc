package com.ryc.api.v2.role.infra.mapper;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.mapper.AdminMapper;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.role.domain.Role;
import com.ryc.api.v2.role.infra.entity.RoleEntity;

public class RoleMapper {

  private RoleMapper() {}

  public static RoleEntity toEntity(Role role, Club club, Admin admin) {
    ClubEntity clubEntity = ClubMapper.toEntity(club);
    AdminEntity adminEntity = AdminMapper.toEntity(admin);
    return RoleEntity.builder().role(role).club(clubEntity).admin(adminEntity).build();
  }
}
