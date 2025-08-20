package com.ryc.api.v2.role.infra;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.domain.Invite;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;
import com.ryc.api.v2.role.infra.entity.InviteEntity;
import com.ryc.api.v2.role.infra.jpa.ClubRoleJpaRepository;
import com.ryc.api.v2.role.infra.jpa.InviteJpaRepository;
import com.ryc.api.v2.role.infra.mapper.ClubRoleMapper;
import com.ryc.api.v2.role.infra.mapper.InviteMapper;

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
  public Invite saveInvite(Invite newInvite) {
    InviteEntity inviteEntity = InviteMapper.toEntity(newInvite);
    InviteEntity savedInviteEntity = inviteJpaRepository.save(inviteEntity);
    return InviteMapper.toDomain(savedInviteEntity);
  }

  @Override
  public List<ClubRole> findRolesByClubId(String clubId) {
    List<ClubRoleEntity> clubRoleEntities = clubRoleJpaRepository.findByClub_Id(clubId);
    return clubRoleEntities.stream().map(ClubRoleMapper::toDomain).toList();
  }

  @Override
  public List<Club> findClubsByAdminId(String adminId) {
    List<ClubEntity> clubEntities = clubRoleJpaRepository.findClubsByAdminId(adminId);
    return clubEntities.stream().map(ClubMapper::toDomain).toList();
  }

  @Override
  public Optional<Invite> findInviteOptionalByClubId(String clubId) {
    return inviteJpaRepository.findByClubId(clubId).map(InviteMapper::toDomain);
  }

  @Override
  public Invite findInviteById(String inviteId) {
    return inviteJpaRepository
        .findById(inviteId)
        .map(InviteMapper::toDomain)
        .orElseThrow(() -> new NoSuchElementException("Invite not found with id: " + inviteId));
  }

  @Override
  public boolean existsByAdminIdAndClubId(String adminId, String clubId) {
    return clubRoleJpaRepository.existsByAdmin_IdAndClub_Id(adminId, clubId);
  }

  @Override
  public boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId) {
    return clubRoleJpaRepository.existsOwnerRoleByAdminIdAndClubId(adminId, clubId);
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
  public int countManagerAndMemberByClubId(String clubId) {
    long count = clubRoleJpaRepository.countManagerAndMemberByClubId(clubId);
    return Math.toIntExact(count); // 21억명이 넘을 가능성은 없지만, type 전환 실수를 위한 safe check
  }

  @Override
  public void deleteAllByAdminId(String adminId) {
    clubRoleJpaRepository.deleteAllByAdmin_Id(adminId);
  }

  @Override
  public void deleteInvite(Invite invite) {
    inviteJpaRepository.deleteById(invite.getId());
  }
}
