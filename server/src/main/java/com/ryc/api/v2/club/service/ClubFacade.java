package com.ryc.api.v2.club.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
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
    return new ClubCreateResponse(savedClub.id());
  }
}
