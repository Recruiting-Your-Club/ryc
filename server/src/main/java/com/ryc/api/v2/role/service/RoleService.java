package com.ryc.api.v2.role.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.role.domain.RoleRepository;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.domain.enums.RoleStatus;
import com.ryc.api.v2.role.domain.vo.ClubRole;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

  private final RoleRepository roleRepository;

  @Transactional
  public ClubRole assignRole(Admin admin, Club club, Role role) {
    ClubRole clubRole = ClubRole.initialize(club, admin, role, RoleStatus.ACTIVE);
    return roleRepository.save(clubRole);
  }

  @Transactional(readOnly = true)
  public boolean hasRole(String adminId, String clubId) {
    return roleRepository.existsByAdminIdAndClubId(adminId, clubId);
  }

  @Transactional(readOnly = true)
  public boolean hasOwnerRole(String adminId, String clubId) {
    return roleRepository.existsOwnerRoleByAdminIdAndClubId(adminId, clubId);
  }

  //  @Transactional
  //  public RoleDemandResponse demandRole(String userId, String clubId) {}
}
