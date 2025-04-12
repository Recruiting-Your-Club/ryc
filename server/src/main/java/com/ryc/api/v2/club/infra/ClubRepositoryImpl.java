package com.ryc.api.v2.club.infra;

import java.util.*;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {
  private final ClubJpaRepository clubJpaRepository;

  @Override
  public Club save(Club club) {
    ClubEntity savedClubEntity = clubJpaRepository.save(ClubMapper.toEntity(club));
    return ClubMapper.toDomain(savedClubEntity);
  }

  @Override
  public Optional<Club> findById(String id) {
    Optional<ClubEntity> clubEntity = clubJpaRepository.findById(id);
    return clubEntity.map(ClubMapper::toDomain);
  }

  @Override
  public List<Club> findAll() {
    List<ClubEntity> clubEntities = clubJpaRepository.findAll();
    return clubEntities.stream().map(ClubMapper::toDomain).toList();
  }
}
