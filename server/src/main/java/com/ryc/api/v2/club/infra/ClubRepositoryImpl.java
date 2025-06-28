package com.ryc.api.v2.club.infra;

import java.util.*;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.Role;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.RoleEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.jpa.RoleJpaRepository;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.club.infra.mapper.RoleMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {

  private final ClubJpaRepository clubJpaRepository;
  private final RoleJpaRepository roleJpaRepository;

  @Override
  public Club save(Club club) {
    ClubEntity clubEntity = ClubMapper.toEntity(club);
    final ClubEntity savedClubEntity = clubJpaRepository.save(clubEntity);

    return ClubMapper.toDomain(savedClubEntity);
  }

  @Override
  public Optional<Club> findById(String id) {
    return clubJpaRepository.findById(id).map(ClubMapper::toDomain);
  }

  @Override
  public boolean existsByName(String name) {
    return clubJpaRepository.existsByName(name);
  }

  @Override
  public List<Club> findAll() {
    return clubJpaRepository.findAll().stream().map(ClubMapper::toDomain).toList();
  }

  @Override
  public Role assignRole(Club club, Admin admin, Role role) {
    RoleEntity savedRole = roleJpaRepository.save(RoleMapper.toEntity(role, club, admin));
    return savedRole.getRole();
  }
}
