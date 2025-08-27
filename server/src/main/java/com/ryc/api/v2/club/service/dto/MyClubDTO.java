package com.ryc.api.v2.club.service.dto;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.role.domain.enums.Role;

public record MyClubDTO(Club club, Role role) {}
