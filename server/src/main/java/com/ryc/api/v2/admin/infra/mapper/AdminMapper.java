package com.ryc.api.v2.admin.infra.mapper;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.infra.entity.AdminEntity;

public class AdminMapper {
  public static AdminEntity toEntity(Admin admin) {
    return AdminEntity.builder()
        .id(admin.getId())
        .name(admin.getName())
        .email(admin.getEmail())
        .password(admin.getPassword())
        .adminDefaultRole(admin.getAdminDefaultRole())
        .isDeleted(admin.getIsDeleted())
        .build();
  }

  public static Admin toDomain(AdminEntity adminEntity) {
    return Admin.builder()
        .id(adminEntity.getId())
        .name(adminEntity.getName())
        .email(adminEntity.getEmail())
        .password(adminEntity.getPassword())
        .adminDefaultRole(adminEntity.getAdminDefaultRole())
        .isDeleted(adminEntity.getIsDeleted())
        .build();
  }
}
