package com.ryc.api.v1.role.service;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.dto.request.ClubRoleRequest;
import com.ryc.api.v1.role.dto.request.UpdateStatusRequest;
import com.ryc.api.v1.role.dto.response.ClubRoleResponse;
import com.ryc.api.v1.role.dto.response.GetClubRoleApplicationResponse;
import com.ryc.api.v1.role.dto.response.UpdateStatusResponse;

import java.util.List;

public interface RoleService {
    ClubRoleResponse createClubRoleApplication(ClubRoleRequest body);

    List<GetClubRoleApplicationResponse> findClubRoleApplications(String clubId, ClubRole clubRole, RequestStatus status);
    UpdateStatusResponse updateClubRoleApplicationStatus(UpdateStatusRequest body);
}
