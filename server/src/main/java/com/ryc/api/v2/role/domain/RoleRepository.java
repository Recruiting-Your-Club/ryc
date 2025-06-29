package com.ryc.api.v2.role.domain;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.vo.Club;

public interface RoleRepository {

  Role save(Admin admin, Club club, Role role);
}
