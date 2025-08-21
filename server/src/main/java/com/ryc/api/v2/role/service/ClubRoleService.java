package com.ryc.api.v2.role.service;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.admin.service.AdminService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.domain.Invite;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.presentation.dto.response.ClubInviteAcceptResponse;
import com.ryc.api.v2.role.presentation.dto.response.ClubInviteCreatedResponse;
import com.ryc.api.v2.role.presentation.dto.response.ClubRoleGetResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubRoleService {

  private final ClubRoleRepository clubRoleRepository;
  private final ClubRepository clubRepository;
  private final FileService fileService;
  private final AdminService adminService;

  @Transactional
  public ClubRole assignRole(Admin admin, Club club, Role role) {
    ClubRole clubRole = ClubRole.initialize(club, admin, role);
    return clubRoleRepository.save(clubRole);
  }

  @Transactional
  public ClubInviteCreatedResponse createInviteCode(String clubId) {
    Optional<Invite> optional = clubRoleRepository.findInviteOptionalByClubId(clubId);
    Invite invite;

    // 만약 초대 링크가 존재하지 않거나 만료되었을 경우 새로 생성
    if (optional.isEmpty()) {
      Invite newInvite = Invite.initialize(clubId);
      invite = clubRoleRepository.saveInvite(newInvite);
    } else {
      invite = optional.get();

      if (invite.isExpired()) {
        clubRoleRepository.deleteInvite(invite);

        Invite newInvite = Invite.initialize(clubId);
        invite = clubRoleRepository.saveInvite(newInvite);
      }
    }

    return ClubInviteCreatedResponse.builder()
        .inviteCode(invite.getId())
        .expiresAt(invite.getExpiresAt())
        .build();
  }

  @Transactional
  public ClubInviteAcceptResponse acceptInvite(
      String newAdminId, String clubId, String inviteCode) {
    // 이미 동아리 멤버인 경우 예외 처리
    if (clubRoleRepository.existsByAdminIdAndClubId(newAdminId, clubId)) {
      throw new ClubException(ClubErrorCode.CLUB_MEMBER_ALREADY_EXISTS);
    }

    // 초대 코드가 존재하지 않거나 만료된 경우 예외 처리
    Invite invite = clubRoleRepository.findInviteById(inviteCode);
    if (invite.isExpired()) {
      throw new ClubException(ClubErrorCode.CLUB_INVITE_EXPIRED);
    }

    Admin newAdmin = adminService.getAdminById(newAdminId);
    Club club = clubRepository.findById(clubId);
    ClubRole clubRole = assignRole(newAdmin, club, Role.MEMBER);
    return ClubInviteAcceptResponse.builder()
        .clubRoleId(clubRole.getId())
        .role(clubRole.getRole().toString())
        .joinedAt(clubRole.getJoinedAt())
        .build();
  }

  @Transactional(readOnly = true)
  public List<ClubRoleGetResponse> getClubRoles(String clubId) {
    List<ClubRole> clubRoles = clubRoleRepository.findRolesByClubId(clubId);

    List<String> adminIds = clubRoles.stream().map(ClubRole::getAdmin).map(Admin::getId).toList();

    Map<String, FileGetResponse> representativeImageMap =
        fileService.findAllByAssociatedIdIn(adminIds).stream()
            .map(
                fileMetaData ->
                    Map.entry(
                        fileMetaData.getAssociatedId(),
                        FileGetResponse.of(
                            fileMetaData, fileService.getPrivateFileGetUrl(fileMetaData))))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    return clubRoles.stream()
        .map(
            clubRole -> {
              Admin admin = clubRole.getAdmin();
              return ClubRoleGetResponse.builder()
                  .adminId(admin.getId())
                  .adminName(admin.getName())
                  .role(clubRole.getRole().toString())
                  .joinedAt(clubRole.getJoinedAt())
                  .adminProfileImage(representativeImageMap.get(admin.getId()))
                  .build();
            })
        .toList();
  }

  @Transactional
  public void deleteRole(String adminId, String clubId, String targetUserId) {
    // 동아리 회장을 삭제하려는 경우 예외 처리
    if (adminId.equals(targetUserId)) {
      throw new ClubException(ClubErrorCode.CLUB_OWNER_CANNOT_BE_DELETED);
    }

    // 동아리 멤버가 아닌 경우 예외 처리
    if (!clubRoleRepository.existsByAdminIdAndClubId(targetUserId, clubId)) {
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
                        toList())));

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
