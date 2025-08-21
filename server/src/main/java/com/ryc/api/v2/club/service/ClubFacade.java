package com.ryc.api.v2.club.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.service.ClubRoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubFacade {

  private final ClubService clubService;
  private final ClubRoleService clubRoleService;
  private final AdminService adminService;
  private final AnnouncementService announcementService;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public ClubCreateResponse createClub(String adminId, ClubCreateRequest body) {
    Club savedClub = clubService.createClub(body);
    Admin admin = adminService.getAdminById(adminId);
    clubRoleService.assignRole(admin, savedClub, Role.OWNER);
    return new ClubCreateResponse(savedClub.getId());
  }

  @Transactional
  public DetailClubResponse updateClub(String clubId, ClubUpdateRequest body) {
    return clubService.updateClub(clubId, body);
  }

  @Transactional(readOnly = true)
  public DetailClubResponse getClub(String clubId) {
    return clubService.getClub(clubId);
  }

  @Transactional(readOnly = true)
  public List<DetailClubResponse> getMyClubs(String adminId) {
    List<Club> myClubs = clubRoleService.getMyClubs(adminId);
    return clubService.createDetailClubResponses(myClubs);
  }

  @Transactional(readOnly = true)
  public List<SimpleClubResponse> getAllClubWithAnnouncementStatus() {
    List<Club> clubs = clubService.getAllClub();
    Map<String, AnnouncementStatus> statuses =
        announcementService.getStatusesByClubIds(clubs.stream().map(Club::getId).toList());

    return clubs.stream()
        .map(club -> clubService.createSimpleClubResponse(club, statuses))
        .toList();
  }

  @Transactional(readOnly = true)
  public SimpleClubResponse getClubByInviteCode(String inviteCode) {
    Club club = clubRoleService.getClubByInviteCode(inviteCode);
    return clubService.createSimpleClubResponse(club, Collections.emptyMap());
  }

  @Transactional
  public void deleteClub(String id) {
    eventPublisher.publishEvent(new ClubDeletedEvent(id));
    clubService.deleteClub(id);
  }
}
