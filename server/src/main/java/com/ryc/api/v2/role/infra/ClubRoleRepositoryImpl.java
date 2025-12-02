package com.ryc.api.v2.role.infra;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.club.infra.projection.MyClubProjection;
import com.ryc.api.v2.club.service.dto.MyClubDTO;
import com.ryc.api.v2.role.domain.ClubInvite;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.infra.entity.ClubInviteEntity;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;
import com.ryc.api.v2.role.infra.jpa.ClubRoleJpaRepository;
import com.ryc.api.v2.role.infra.jpa.InviteJpaRepository;
import com.ryc.api.v2.role.infra.mapper.ClubInviteMapper;
import com.ryc.api.v2.role.infra.mapper.ClubRoleMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClubRoleRepositoryImpl implements ClubRoleRepository {

  private final ClubRoleJpaRepository clubRoleJpaRepository;
  private final InviteJpaRepository inviteJpaRepository;

  @Override
  public ClubRole save(ClubRole clubRole) {
    ClubRoleEntity clubRoleEntity = ClubRoleMapper.toEntity(clubRole);
    ClubRoleEntity savedClubRoleEntity = clubRoleJpaRepository.save(clubRoleEntity);
    return ClubRoleMapper.toDomain(savedClubRoleEntity);
  }

  @Override
  public ClubInvite saveInvite(ClubInvite newClubInvite) {
    ClubInviteEntity clubInviteEntity = ClubInviteMapper.toEntity(newClubInvite);
    ClubInviteEntity savedClubInviteEntity = inviteJpaRepository.save(clubInviteEntity);
    return ClubInviteMapper.toDomain(savedClubInviteEntity);
  }

  @Override
  public List<ClubRole> findRolesByClubId(String clubId) {
    List<ClubRoleEntity> clubRoleEntities = clubRoleJpaRepository.findByClub_Id(clubId);
    return clubRoleEntities.stream().map(ClubRoleMapper::toDomain).toList();
  }

  @Override
  public List<MyClubDTO> findMyClubsByAdminId(String adminId) {
    List<MyClubProjection> projections = clubRoleJpaRepository.findClubsAndRolesByAdmin_Id(adminId);
    return projections.stream()
        .map(p -> new MyClubDTO(ClubMapper.toDomain(p.getClub()), p.getRole()))
        .toList();
  }

  @Override
  public Optional<ClubInvite> findInviteOptionalByClubId(String clubId) {
    return inviteJpaRepository.findByClub_Id(clubId).map(ClubInviteMapper::toDomain);
  }

  @Override
  public ClubInvite findInviteById(String inviteId) {
    return inviteJpaRepository
        .findById(inviteId)
        .map(ClubInviteMapper::toDomain)
        .orElseThrow(() -> new NoSuchElementException("Invite not found with id: " + inviteId));
  }

  @Override
  public boolean existsByAdminIdAndClubId(String adminId, String clubId) {
    return clubRoleJpaRepository.existsByAdmin_IdAndClub_Id(adminId, clubId);
  }

  @Override
  public boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId) {
    return clubRoleJpaRepository.existsOwnerRoleByAdmin_IdAndClub_Id(adminId, clubId);
  }

  @Override
  public boolean existsByClubId(String clubId) {
    return clubRoleJpaRepository.existsByClub_Id(clubId);
  }

  @Override
  public boolean existsByAdminId(String adminId) {
    return clubRoleJpaRepository.existsByAdmin_Id(adminId);
  }

  @Override
  public void deleteByAdminIdAndClubId(String adminId, String clubId) {
    clubRoleJpaRepository.deleteByAdmin_IdAndClub_Id(adminId, clubId);
  }

  @Override
  public void deleteByClubId(String clubId) {
    clubRoleJpaRepository.deleteByClub_Id(clubId);
  }

  @Override
  public int countOwnerAndMemberByClubId(String clubId) {
    long count = clubRoleJpaRepository.countByClubId(clubId);
    return Math.toIntExact(count); // 21억명이 넘을 가능성은 없지만, type 전환 실수를 위한 safe check
  }

  @Override
  public void deleteAllByAdminId(String adminId) {
    clubRoleJpaRepository.deleteAllByAdmin_Id(adminId);
  }

  @Override
  public void deleteInvite(ClubInvite clubInvite) {
    inviteJpaRepository.deleteById(clubInvite.getId());
  }
}
