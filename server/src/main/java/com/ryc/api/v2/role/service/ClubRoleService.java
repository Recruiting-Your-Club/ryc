package com.ryc.api.v2.role.service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.domain.vo.ClubRole;
import com.ryc.api.v2.role.presentation.dto.response.ClubRoleGetResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubRoleService {

  private final ClubRoleRepository clubRoleRepository;
  private final FileService fileService;

  @Transactional
  public ClubRole assignRole(Admin admin, Club club, Role role) {
    ClubRole clubRole = ClubRole.initialize(club, admin, role);
    return clubRoleRepository.save(clubRole);
  }

  @Transactional(readOnly = true)
  public List<ClubRoleGetResponse> getClubRoles(String clubId) {
    List<ClubRole> clubRoles = clubRoleRepository.findRolesByClubId(clubId);

    // TODO: clubid -> adminId 변경 필요,
    //  CLUB_PROFILE -> ADMIN_PROFILE 변경 필요
    FileGetResponse representativeImage =
        fileService.findAllByAssociatedId(clubId).stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)))
            .orElse(null);

    return clubRoles.stream()
        .map(
            clubRole -> {
              Admin admin = clubRole.getAdmin();
              return ClubRoleGetResponse.builder()
                  .adminId(admin.getId())
                  .adminName(admin.getName())
                  .role(clubRole.getRole().toString())
                  .fileGetResponse(representativeImage)
                  .build();
            })
        .toList();
  }

  @Transactional
  public void deleteRole(String adminId, String clubId, String targetUserId) {
    if (adminId.equals(targetUserId)) {
      throw new ClubException(ClubErrorCode.CLUB_OWNER_CANNOT_BE_DELETED);
    }

    if (!clubRoleRepository.existsByAdminIdAndClubId(adminId, clubId)) {
      throw new NoSuchElementException(
          "Club roles not found for adminId: " + adminId + " and clubId: " + clubId);
    }

    clubRoleRepository.deleteByAdminIdAndClubId(targetUserId, clubId);
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
    if (!clubRoleRepository.existsByClubId(event.clubId())) {
      return;
    }

    clubRoleRepository.deleteByClubId(event.clubId());
  }

  @Transactional
  @EventListener
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    if (!clubRoleRepository.existsByAdminId(event.adminId())) {
      return;
    }

    clubRoleRepository.deleteAllByAdminId(event.adminId());
  }
}
