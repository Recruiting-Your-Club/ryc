package com.ryc.api.v2.role.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetByAdminIdResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.domain.vo.ClubRole;
import com.ryc.api.v2.role.presentation.dto.response.AdminsGetResponse;
import com.ryc.api.v2.role.presentation.dto.response.RoleDemandResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubRoleService {

  private final ClubRoleRepository clubRoleRepository;
  private final ClubRepository clubRepository;
  private final AdminService adminService;

  @Transactional
  public RoleDemandResponse assignRole(String userId, String clubId) {
    Club club = clubRepository.findById(clubId);
    Admin admin = adminService.getAdminById(userId);
    ClubRole clubRole = assignRole(admin, club, Role.MEMBER);

    return new RoleDemandResponse(clubRole.id());
  }

  @Transactional
  public ClubRole assignRole(Admin admin, Club club, Role role) {
    ClubRole clubRole = ClubRole.initialize(club, admin, role);
    return clubRoleRepository.save(clubRole);
  }

  @Transactional(readOnly = true)
  public List<AdminsGetResponse> getAdminsInClub(String clubId) {
    List<ClubRole> clubRoles = clubRoleRepository.findRolesByClubId(clubId);

    return clubRoles.stream()
        .map(
            clubRole ->
                AdminsGetResponse.builder()
                    .adminId(clubRole.admin().getId())
                    .name(clubRole.admin().getName())
                    .imageUrl(clubRole.admin().getImageUrl())
                    .thumbnailUrl(clubRole.admin().getThumbnailUrl())
                    .role(clubRole.role().toString())
                    .build())
        .toList();
  }

  @Transactional
  public void deleteRole(String adminId, String clubId, String targetUserId) {
    if (adminId.equals(targetUserId)) {
      throw new ClubException(ClubErrorCode.CLUB_OWNER_CANNOT_BE_DELETED);
    }

    if (!clubRoleRepository.existsByAdminIdAndClubId(targetUserId, clubId)) {
      throw new ClubException(ClubErrorCode.CLUB_MEMBER_NOT_FOUND);
    }

    clubRoleRepository.deleteByUserId(targetUserId);
  }

  @Transactional(readOnly = true)
  public List<ClubGetByAdminIdResponse> getClubByAdminId(String adminId) {
    List<Club> clubs = clubRoleRepository.findClubsByAdminId(adminId);
    return clubs.stream()
        .map(
            club ->
                ClubGetByAdminIdResponse.builder()
                    .id(club.getId())
                    .name(club.getName())
                    .shortDescription(club.getShortDescription())
                    .imageUrl(club.getImageUrl())
                    .thumbnailUrl(club.getThumbnailUrl())
                    .build())
        .toList();
  }

  @Transactional(readOnly = true)
  public boolean hasRole(String adminId, String clubId) {
    return clubRoleRepository.existsByAdminIdAndClubId(adminId, clubId);
  }

  @Transactional(readOnly = true)
  public boolean hasOwnerRole(String adminId, String clubId) {
    return clubRoleRepository.existsOwnerRoleByAdminIdAndClubId(adminId, clubId);
  }
}
