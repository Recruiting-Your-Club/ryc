package com.ryc.api.v2.club.infra;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.vo.Club;
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
  public boolean existsById(String clubId) {
    return clubJpaRepository.existsById(clubId);
  }
}
