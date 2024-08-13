package com.ryc.api.v1.role.service;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.dto.ClubRoleRequest;
import com.ryc.api.v1.role.dto.ClubRoleResponse;
import com.ryc.api.v1.role.dto.GetClubRoleApplicationResponse;

import java.util.List;

public interface RoleService {
    ClubRoleResponse createClubRoleApplication(ClubRoleRequest body);

    List<GetClubRoleApplicationResponse> findClubRoleApplications(String clubId, ClubRole clubRole, RequestStatus status);
}
