package com.ryc.api.v2.auth.domain.event;

import java.time.LocalDateTime;

public record RefreshTokenIssuedEvent(
    String adminId, String refreshToken, LocalDateTime expirationTime) {}
