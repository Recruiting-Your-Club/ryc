package com.ryc.api.v2.role.domain;

import java.util.List;
import java.util.Optional;

import com.ryc.api.v2.club.service.dto.MyClubDTO;

public interface ClubRoleRepository {

  ClubRole save(ClubRole clubRole);

  ClubInvite saveInvite(ClubInvite newClubInvite);

  List<ClubRole> findRolesByClubId(String clubId);

  List<MyClubDTO> findMyClubsByAdminId(String adminId);

  Optional<ClubInvite> findInviteOptionalByClubId(String clubId);

  ClubInvite findInviteById(String inviteId);

  boolean existsByAdminIdAndClubId(String adminId, String clubId);

  boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId);

  boolean existsByClubId(String clubId);

  boolean existsByAdminId(String adminId);

  void deleteByAdminIdAndClubId(String adminId, String clubId);

  void deleteByClubId(String clubId);

  int countManagerAndMemberByClubId(String clubId);

  void deleteAllByAdminId(String adminId);

  void deleteInvite(ClubInvite clubInvite);
}
