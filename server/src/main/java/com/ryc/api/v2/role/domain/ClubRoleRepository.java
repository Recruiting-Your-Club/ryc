package com.ryc.api.v2.role.domain;

import java.util.List;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.role.domain.vo.ClubRole;

public interface ClubRoleRepository {

  ClubRole save(ClubRole clubRole);

  List<ClubRole> findRolesByClubId(String clubId);

  List<Club> findClubsByAdminId(String adminId);

  boolean existsByAdminIdAndClubId(String adminId, String clubId);

  boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId);

  boolean existsByClubId(String clubId);

  boolean existsByAdminId(String adminId);

  void deleteByAdminIdAndClubId(String adminId, String clubId);

  void deleteByClubId(String clubId);

  int countManagerAndMemberByClubId(String clubId);

  void deleteAllByAdminId(String adminId);
}
