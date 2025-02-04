package com.ryc.api.v1.role.repository;

import com.ryc.api.v1.club.domain.Category;
import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.ClubRoleApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRoleApplicationRepository extends JpaRepository<ClubRoleApplication, String> {
    List<ClubRoleApplication> findByClubId(String clubId);

    List<ClubRoleApplication> findByClubIdAndRequestedRole(String clubId, ClubRole requestedRole);

    List<ClubRoleApplication> findByClubIdAndRequestStatus(String clubId, RequestStatus requestStatus);

    List<ClubRoleApplication> findByClubIdAndRequestedRoleAndRequestStatus(String clubId, ClubRole requestedRole, RequestStatus requestStatus);

    ClubRoleApplication findClubRoleApplicationById(String clubRoleApplicationId);


}
