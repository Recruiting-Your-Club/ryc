package com.ryc.api.v2.auth.infra.mapper;

import com.ryc.api.v2.auth.domain.RefreshToken;
import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.auth.infra.entity.RefreshTokenEntity;

public class RefreshTokenMapper {
    public static RefreshTokenEntity toEntity(RefreshToken refreshToken, AdminEntity adminEntity) {
        return RefreshTokenEntity.builder()
                .id(refreshToken.getId())
                .adminEntity(adminEntity)
                .token(refreshToken.getToken())
                .expirationTime(refreshToken.getExpirationTime())
                .build();
    }

    public static RefreshToken toDomain(RefreshTokenEntity refreshTokenEntity) {
        return RefreshToken.builder()
                .id(refreshTokenEntity.getId())
                .adminId(refreshTokenEntity.getAdminEntity().getId())
                .token(refreshTokenEntity.getToken())
                .expirationTime(refreshTokenEntity.getExpirationTime())
                .build();
    }
}
