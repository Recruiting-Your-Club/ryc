package com.ryc.api.v2.club.service;

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
import com.ryc.api.v2.club.presentation.dto.response.MyClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.club.service.dto.ClubImageDTO;
import com.ryc.api.v2.club.service.dto.MyClubDTO;
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
  public List<MyClubGetResponse> getMyClubs(String adminId) {
    List<MyClubDTO> myClubDTOS = clubRoleService.getMyClubs(adminId);
    List<String> myClubIds = myClubDTOS.stream().map(dto -> dto.club().getId()).toList();

    Map<String, ClubImageDTO> imageDTOMap = clubService.getClubImageDTOs(myClubIds);

    return myClubDTOS.stream()
        .map(
            clubDTO -> {
              DetailClubResponse clubResponse =
                  clubService.createDetailClubResponse(
                      clubDTO.club(), imageDTOMap.get(clubDTO.club().getId()));
              return new MyClubGetResponse(clubResponse, clubDTO.role());
            })
        .toList();
  }

  @Transactional(readOnly = true)
  public List<SimpleClubResponse> getAllClubWithAnnouncementStatus() {
    List<Club> clubs = clubService.getAllClub();
    List<String> clubIds = clubs.stream().map(Club::getId).toList();

    Map<String, AnnouncementStatus> statuses = announcementService.getStatusesByClubIds(clubIds);

    Map<String, ClubImageDTO> imageDTOMap = clubService.getClubImageDTOs(clubIds);

    return clubs.stream()
        .map(
            club ->
                SimpleClubResponse.builder()
                    .id(club.getId())
                    .name(club.getName())
                    .shortDescription(club.getShortDescription())
                    .representativeImage(imageDTOMap.get(club.getId()).representativeImage())
                    .category(club.getCategory())
                    .clubTags(club.getClubTags())
                    .announcementStatus(statuses.get(club.getId()))
                    .build())
        .toList();
  }

  @Transactional(readOnly = true)
  public SimpleClubResponse getClubByInviteCode(String inviteCode) {
    Club club = clubRoleService.getClubByInviteCode(inviteCode);
    ClubImageDTO clubImage = clubService.getClubImageDTO(club.getId());
    return SimpleClubResponse.builder()
        .id(club.getId())
        .name(club.getName())
        .shortDescription(club.getShortDescription())
        .representativeImage(clubImage.representativeImage())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .build();
  }

  @Transactional
  public void deleteClub(String id) {
    if (clubService.existClubById(id)) {
      eventPublisher.publishEvent(new ClubDeletedEvent(id));
      clubService.deleteClub(id);
    }
  }
}
