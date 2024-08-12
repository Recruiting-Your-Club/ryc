package com.ryc.api.v1.role.service;

import com.ryc.api.v1.role.dto.ClubRoleRequest;
import com.ryc.api.v1.role.dto.ClubRoleResponse;

public interface RoleService {
    ClubRoleResponse createClubRoleApplication(ClubRoleRequest body);
}
