package com.ryc.api.v2.role.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;
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
  private final FileService fileService;

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
  public List<DetailClubResponse> getMyClubs(String adminId) {
    List<Club> clubs = clubRoleRepository.findClubsByAdminId(adminId);

    List<FileMetaData> fileMetaData =
        fileService.findAllByAssociatedIdIn(clubs.stream().map(Club::getId).toList());
    Map<String, FileGetResponse> representativeImageMap =
        fileMetaData.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .collect(
                Collectors.toMap(
                    FileMetaData::getAssociatedId,
                    image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image))));

    Map<String, List<FileGetResponse>> detailImageMap =
        fileMetaData.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_IMAGE)
            .collect(
                Collectors.groupingBy(
                    FileMetaData::getAssociatedId,
                    Collectors.mapping(
                        image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)),
                        Collectors.toList())));

    return clubs.stream()
        .map(
            club ->
                DetailClubResponse.builder()
                    .id(club.getId())
                    .name(club.getName())
                    .shortDescription(club.getShortDescription())
                    .detailDescription(club.getDetailDescription())
                    .category(club.getCategory())
                    .clubTags(club.getClubTags())
                    .clubSummaries(club.getClubSummaries())
                    .representativeImage(representativeImageMap.get(club.getId()))
                    .clubDetailImages(detailImageMap.get(club.getId()))
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

  @EventListener
  @Transactional
  protected void handleClubDeletedEvent(ClubDeletedEvent event) {
    clubRoleRepository.deleteByClubId(event.clubId());
  }

  @Transactional
  @EventListener
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    clubRoleRepository.deleteByUserId(event.adminId());
  }
}
