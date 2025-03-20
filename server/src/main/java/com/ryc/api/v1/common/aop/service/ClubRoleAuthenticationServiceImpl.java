package com.ryc.api.v1.common.aop.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v1.role.domain.ClubRole;
import com.ryc.api.v1.role.repository.UserClubRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubRoleAuthenticationServiceImpl implements ClubRoleAuthenticationService {
  private final UserClubRoleRepository userClubRoleRepository;

  @Override
  @Transactional
  public boolean hasClubRole(String userId, String clubId, ClubRole clubRole) {
    return userClubRoleRepository
        .findByClubIdAndUserId(clubId, userId)
        .map(userClubRole -> userClubRole.getClubRole() == clubRole)
        .orElse(false);
  }

  @Override
  @Transactional
  public boolean hasAnyClubRole(String userId, String clubId) {
    return userClubRoleRepository.findByClubIdAndUserId(clubId, userId).isPresent();
  }
}
