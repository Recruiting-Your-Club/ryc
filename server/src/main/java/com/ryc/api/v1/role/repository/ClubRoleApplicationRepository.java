package com.ryc.api.v1.role.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.ClubRoleApplication;

@Repository
public interface ClubRoleApplicationRepository extends JpaRepository<ClubRoleApplication, String> {
  List<ClubRoleApplication> findByClubId(String clubId);

  List<ClubRoleApplication> findByClubIdAndRequestedRole(String clubId, ClubRole requestedRole);

  List<ClubRoleApplication> findByClubIdAndRequestStatus(
      String clubId, RequestStatus requestStatus);

  List<ClubRoleApplication> findByClubIdAndRequestedRoleAndRequestStatus(
      String clubId, ClubRole requestedRole, RequestStatus requestStatus);

  ClubRoleApplication findClubRoleApplicationById(String clubRoleApplicationId);
}
