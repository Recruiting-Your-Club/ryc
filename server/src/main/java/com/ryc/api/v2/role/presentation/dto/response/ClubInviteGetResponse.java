package com.ryc.api.v2.role.presentation.dto.response;

import lombok.Builder;

@Builder
public record ClubInviteGetResponse(String inviteCode, String expiresAt) {}
