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
                .imageUrl(admin.getImageUrl())
                .thumbnailUrl(admin.getThumbnailUrl())
                .adminDefaultRole(admin.getAdminDefaultRole())
                .deleted(admin.getDeleted())
                .build();
    }

    public static Admin toDomain(AdminEntity adminEntity) {
        return Admin.builder()
                .id(adminEntity.getId())
                .name(adminEntity.getName())
                .email(adminEntity.getEmail())
                .password(adminEntity.getPassword())
                .imageUrl(adminEntity.getImageUrl())
                .thumbnailUrl(adminEntity.getThumbnailUrl())
                .adminDefaultRole(adminEntity.getAdminDefaultRole())
                .deleted(adminEntity.getDeleted())
                .build();
    }
}
