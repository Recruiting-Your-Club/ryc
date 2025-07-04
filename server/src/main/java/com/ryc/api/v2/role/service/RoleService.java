package com.ryc.api.v2.role.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.domain.AdminRepository;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.role.domain.RoleRepository;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.domain.vo.ClubRole;
import com.ryc.api.v2.role.presentation.dto.response.AdminsGetResponse;
import com.ryc.api.v2.role.presentation.dto.response.RoleDemandResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

  private final RoleRepository roleRepository;
  private final ClubRepository clubRepository;
  private final AdminRepository adminRepository;

  @Transactional
  public RoleDemandResponse assignRole(String userId, String clubId) {
    Club club =
        clubRepository
            .findById(clubId)
            .orElseThrow(() -> new ClubException(ClubErrorCode.CLUB_NOT_FOUND));

    Admin admin =
        adminRepository
            .findById(userId)
            .orElseThrow(() -> new NoSuchElementException("Admin not found with id: " + userId));

    ClubRole clubRole = assignRole(admin, club, Role.MEMBER);
    return new RoleDemandResponse(clubRole.id());
  }

  @Transactional
  public ClubRole assignRole(Admin admin, Club club, Role role) {
    ClubRole clubRole = ClubRole.initialize(club, admin, role);
    return roleRepository.save(clubRole);
  }

  @Transactional(readOnly = true)
  @HasRole(Role.MEMBER)
  public List<AdminsGetResponse> getAdminsInClub(ClubRoleSecuredDto dto) {
    List<Admin> admins = roleRepository.findAdminsByClubId(dto.clubId());
    return admins.stream()
        .map(
            admin ->
                AdminsGetResponse.builder()
                    .adminId(admin.getId())
                    .name(admin.getName())
                    .imageUrl(admin.getImageUrl())
                    .thumbnailUrl(admin.getThumbnailUrl())
                    .build())
        .toList();
  }

  @Transactional(readOnly = true)
  public boolean hasRole(String adminId, String clubId) {
    return roleRepository.existsByAdminIdAndClubId(adminId, clubId);
  }

  @Transactional(readOnly = true)
  public boolean hasOwnerRole(String adminId, String clubId) {
    return roleRepository.existsOwnerRoleByAdminIdAndClubId(adminId, clubId);
  }

  @Transactional
  @HasRole(Role.OWNER)
  public void deleteRole(ClubRoleSecuredDto dto, String targetUserId) {
    if (!roleRepository.existsByAdminIdAndClubId(dto.clubId(), targetUserId)) {
      throw new ClubException(ClubErrorCode.CLUB_MEMBER_NOT_FOUND);
    }

    roleRepository.deleteByUserId(targetUserId);
  }
}
