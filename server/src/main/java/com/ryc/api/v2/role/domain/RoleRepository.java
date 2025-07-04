package com.ryc.api.v2.role.domain;

import java.util.List;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.role.domain.vo.ClubRole;

public interface RoleRepository {

  ClubRole save(ClubRole clubRole);

  List<Admin> findAdminsByClubId(String clubId);

  boolean existsByAdminIdAndClubId(String adminId, String clubId);

  boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId);

  void deleteByUserId(String adminId);
}
