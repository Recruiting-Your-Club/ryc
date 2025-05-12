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
    ClubEntity clubEntity = ClubMapper.toEntity(club);
    final ClubEntity savedClubEntity = clubJpaRepository.save(clubEntity);

    return ClubMapper.toDomain(savedClubEntity);
  }

  @Override
  public Club findById(String id) {
    final ClubEntity clubEntity =
        clubJpaRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));

    return ClubMapper.toDomain(clubEntity);
  }

  @Override
  public List<Club> findAll() {
    return clubJpaRepository.findAll().stream().map(ClubMapper::toDomain).toList();
  }
}
