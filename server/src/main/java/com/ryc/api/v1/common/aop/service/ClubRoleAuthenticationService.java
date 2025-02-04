package com.ryc.api.v1.common.aop.service;

import com.ryc.api.v1.role.domain.ClubRole;

public interface ClubRoleAuthenticationService {
    boolean hasClubRole(String userId, String clubId, ClubRole clubRole);
    boolean hasAnyClubRole(String userId, String clubId);
}
