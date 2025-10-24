package com.ryc.api.v2.role.service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.admin.domain.event.AdminDeletedEvent;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.service.dto.MyClubDTO;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.ClubInvite;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
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
  private final AdminRepository adminRepository;

  @Transactional
  public ClubRole assignRole(Admin admin, Club club, Role role) {
    ClubRole clubRole = ClubRole.initialize(club, admin, role);
    return clubRoleRepository.save(clubRole);
  }

  @Transactional
  public ClubInviteCreatedResponse createInviteCode(String clubId) {
    Optional<ClubInvite> optional = clubRoleRepository.findInviteOptionalByClubId(clubId);
    ClubInvite clubInvite;

    // 만약 초대 링크가 존재하지 않거나 만료되었을 경우 새로 생성
    if (optional.isEmpty()) {
      clubInvite = createAndSaveInvite(clubId);
    } else {
      clubInvite = optional.get();

      if (clubInvite.isExpired()) {
        clubRoleRepository.deleteInvite(clubInvite);

        clubInvite = createAndSaveInvite(clubId);
      }
    }

    return ClubInviteCreatedResponse.builder()
        .inviteCode(clubInvite.getId())
        .expiresAt(clubInvite.getExpiresAt())
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
    ClubInvite clubInvite = clubRoleRepository.findInviteById(inviteCode);
    if (clubInvite.isExpired()) {
      throw new ClubException(ClubErrorCode.CLUB_INVITE_EXPIRED);
    }

    Admin newAdmin = adminRepository.findById(newAdminId);
    Club club = clubRepository.findById(clubId);

    // 동아리 아이디와 초대 코드가 일치하지 않는 경우 예외 처리
    if (!club.getId().equals(clubId)) {
      throw new NoSuchElementException("동아리 아이디와 초대 코드가 일치하지 않습니다.");
    }

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
  public List<MyClubDTO> getMyClubs(String adminId) {
    return clubRoleRepository.findMyClubsByAdminId(adminId);
  }

  @Transactional(readOnly = true)
  public Club getClubByInviteCode(String inviteCode) {
    ClubInvite clubInvite = clubRoleRepository.findInviteById(inviteCode);

    if (clubInvite.isExpired()) {
      throw new ClubException(ClubErrorCode.CLUB_INVITE_EXPIRED);
    }

    return clubInvite.getClub();
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
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleClubDeletedEvent(ClubDeletedEvent event) {
    if (!clubRoleRepository.existsByClubId(event.clubId())) {
      return;
    }

    clubRoleRepository.deleteByClubId(event.clubId());
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleAdminDeletedEvent(AdminDeletedEvent event) {
    if (!clubRoleRepository.existsByAdminId(event.adminId())) {
      return;
    }

    clubRoleRepository.deleteAllByAdminId(event.adminId());
  }

  private ClubInvite createAndSaveInvite(String clubId) {
    Club club = clubRepository.findById(clubId);
    ClubInvite newClubInvite = ClubInvite.initialize(club);
    return clubRoleRepository.saveInvite(newClubInvite);
  }
}
