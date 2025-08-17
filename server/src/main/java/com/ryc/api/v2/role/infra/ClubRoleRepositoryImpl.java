package com.ryc.api.v2.role.infra;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.domain.vo.ClubRole;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;
import com.ryc.api.v2.role.infra.jpa.ClubRoleJpaRepository;
import com.ryc.api.v2.role.infra.mapper.ClubRoleMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClubRoleRepositoryImpl implements ClubRoleRepository {

  private final ClubRoleJpaRepository clubRoleJpaRepository;

  @Override
  public ClubRole save(ClubRole clubRole) {
    ClubRoleEntity clubRoleEntity = ClubRoleMapper.toEntity(clubRole);
    ClubRoleEntity savedClubRoleEntity = clubRoleJpaRepository.save(clubRoleEntity);
    return ClubRoleMapper.toDomain(savedClubRoleEntity);
  }

  @Override
  public List<ClubRole> findRolesByClubId(String clubId) {
    List<ClubRoleEntity> clubRoleEntities = clubRoleJpaRepository.findByClubId(clubId);
    return clubRoleEntities.stream().map(ClubRoleMapper::toDomain).toList();
  }

  @Override
  public List<Club> findClubsByAdminId(String adminId) {
    List<ClubEntity> clubEntities = clubRoleJpaRepository.findClubsByAdminId(adminId);
    return clubEntities.stream().map(ClubMapper::toDomain).toList();
  }

  @Override
  public boolean existsByAdminIdAndClubId(String adminId, String clubId) {
    return clubRoleJpaRepository.existsByAdminIdAndClubId(adminId, clubId);
  }

  @Override
  public boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId) {
    return clubRoleJpaRepository.existsOwnerRoleByAdminIdAndClubId(adminId, clubId);
  }

  @Override
  public void deleteByUserId(String adminId) {
    clubRoleJpaRepository.deleteByAdminId(adminId);
  }

  @Override
  public void deleteByClubId(String clubId) {
    clubRoleJpaRepository.deleteByClubId(clubId);
  }

  @Override
  public int countManagerAndMemberByClubId(String clubId) {
    long count = clubRoleJpaRepository.countManagerAndMemberByClubId(clubId);
    return Math.toIntExact(count); // 21억명이 넘을 가능성은 없지만, type 전환 실수를 위한 safe check
  }
}
