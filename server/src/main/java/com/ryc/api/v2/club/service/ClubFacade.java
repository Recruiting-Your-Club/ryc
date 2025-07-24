package com.ryc.api.v2.club.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetByAdminIdResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.service.ClubRoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubFacade {

  private final ClubService clubService;
  private final ClubRoleService clubRoleService;
  private final AdminService adminService;

  @Transactional
  public ClubCreateResponse createClub(String adminId, ClubCreateRequest body) {
    Club savedClub = clubService.createClub(body);
    Admin admin = adminService.getAdminById(adminId);
    clubRoleService.assignRole(admin, savedClub, Role.OWNER);
    return new ClubCreateResponse(savedClub.getId());
  }

  @Transactional
  public ClubUpdateResponse updateClub(String clubId, ClubUpdateRequest body) {
    return clubService.updateClub(clubId, body);
  }

  @Transactional(readOnly = true)
  public ClubGetResponse getClub(String clubId) {
    return clubService.getClub(clubId);
  }

  @Transactional(readOnly = true)
  public List<ClubGetByAdminIdResponse> getClubByAdminId(String adminId) {
    return clubRoleService.getClubByAdminId(adminId);
  }
}
