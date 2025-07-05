package com.ryc.api.v2.auth.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

@Getter
@Builder
public class RefreshToken {
    private final String id;
    private final String adminId;
    private final String token;
    private final LocalDateTime expirationTime;

    public static RefreshToken initialize(String adminId, String refreshToken, LocalDateTime expirationTime){
        return RefreshToken.builder()
                .id(DEFAULT_INITIAL_ID)
                .adminId(adminId)
                .token(refreshToken)
                .expirationTime(expirationTime)
                .build();
    }
}
