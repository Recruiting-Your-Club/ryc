package com.ryc.api.v2.role.business;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.role.domain.Role;
import com.ryc.api.v2.role.domain.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

  private final RoleRepository roleRepository;

  @Transactional
  public Role assignRole(Admin admin, Club club, Role role) {
    return roleRepository.save(admin, club, role);
  }
}
