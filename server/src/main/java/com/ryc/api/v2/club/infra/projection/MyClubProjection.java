package com.ryc.api.v2.club.infra.projection;

import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.role.domain.enums.Role;

public interface MyClubProjection {

  ClubEntity getClub();

  Role getRole();
}
