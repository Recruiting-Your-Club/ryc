package com.ryc.api.v2.role.domain;

import java.util.List;
import java.util.Optional;

import com.ryc.api.v2.club.domain.Club;

public interface ClubRoleRepository {

  ClubRole save(ClubRole clubRole);

  Invite saveInvite(Invite newInvite);

  List<ClubRole> findRolesByClubId(String clubId);

  List<Club> findClubsByAdminId(String adminId);

  Optional<Invite> findInviteOptionalByClubId(String clubId);

  Invite findInviteById(String inviteId);

  boolean existsByAdminIdAndClubId(String adminId, String clubId);

  boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId);

  boolean existsByClubId(String clubId);

  boolean existsByAdminId(String adminId);

  void deleteByAdminIdAndClubId(String adminId, String clubId);

  void deleteByClubId(String clubId);

  int countManagerAndMemberByClubId(String clubId);

  void deleteAllByAdminId(String adminId);

  void deleteInvite(Invite invite);
}
