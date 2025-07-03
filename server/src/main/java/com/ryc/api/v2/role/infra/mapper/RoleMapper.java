package com.ryc.api.v2.role.infra.mapper;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.infra.entity.AdminEntity;
import com.ryc.api.v2.auth.infra.mapper.AdminMapper;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.role.domain.vo.ClubRole;
import com.ryc.api.v2.role.infra.entity.RoleEntity;

public class RoleMapper {

  private RoleMapper() {}

  public static RoleEntity toEntity(ClubRole clubRole) {
    ClubEntity clubEntity = ClubMapper.toEntity(clubRole.club());
    AdminEntity adminEntity = AdminMapper.toEntity(clubRole.admin());
    return RoleEntity.builder()
        .role(clubRole.role())
        .club(clubEntity)
        .admin(adminEntity)
        .status(clubRole.status())
        .build();
  }

  public static ClubRole toDomain(RoleEntity roleEntity) {
    Club club = ClubMapper.toDomain(roleEntity.getClub());
    Admin admin = AdminMapper.toDomain(roleEntity.getAdmin());
    return ClubRole.builder()
        .id(roleEntity.getId())
        .club(club)
        .admin(admin)
        .role(roleEntity.getRole())
        .status(roleEntity.getStatus())
        .createdAt(roleEntity.getCreatedAt())
        .updatedAt(roleEntity.getUpdatedAt())
        .build();
  }
}
