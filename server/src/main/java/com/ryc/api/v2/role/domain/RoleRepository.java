package com.ryc.api.v2.role.domain;

import com.ryc.api.v2.role.domain.vo.ClubRole;

public interface RoleRepository {

  ClubRole save(ClubRole clubRole);

  boolean existsByAdminIdAndClubId(String adminId, String clubId);

  boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId);
}
