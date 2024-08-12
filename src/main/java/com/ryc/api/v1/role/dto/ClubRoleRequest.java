package com.ryc.api.v1.role.dto;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.domain.ClubRoleApplication;
import com.ryc.api.v1.user.domain.User;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ClubRoleRequest(@NotEmpty(message = "clubId shouldn't be empty") String clubId,
                              @NotNull(message = "name shouldn't be empty") ClubRole requestedRole) {

    public ClubRoleApplication toClubRoleApplication(User requestUser, Club club) {
        return ClubRoleApplication.builder()
                .user(requestUser)
                .club(club)
                .requestedRole(this.requestedRole)
                .requestStatus(RequestStatus.PENDING)
                .build();
    }
}
