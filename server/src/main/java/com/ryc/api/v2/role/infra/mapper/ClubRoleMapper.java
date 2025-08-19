package com.ryc.api.v2.role.infra.mapper;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.mapper.AdminMapper;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

public class ClubRoleMapper {

  private ClubRoleMapper() {}

  public static ClubRoleEntity toEntity(ClubRole clubRole) {
    ClubEntity clubEntity = ClubMapper.toEntity(clubRole.getClub());
    AdminEntity adminEntity = AdminMapper.toEntity(clubRole.getAdmin());
    return ClubRoleEntity.builder()
        .role(clubRole.getRole())
        .club(clubEntity)
        .admin(adminEntity)
        .build();
  }

  public static ClubRole toDomain(ClubRoleEntity clubRoleEntity) {
    Club club = ClubMapper.toDomain(clubRoleEntity.getClub());
    Admin admin = AdminMapper.toDomain(clubRoleEntity.getAdmin());
    return ClubRole.builder()
        .id(clubRoleEntity.getId())
        .club(club)
        .admin(admin)
        .role(clubRoleEntity.getRole())
        .createdAt(clubRoleEntity.getCreatedAt())
        .build();
  }
}
