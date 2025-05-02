package com.ryc.api.v2.club.infra;

import java.util.*;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubSummaryJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubTagJpaRepository;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.club.infra.mapper.ClubSummaryMapper;
import com.ryc.api.v2.club.infra.mapper.ClubTagMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {
  private final ClubJpaRepository clubJpaRepository;
  private final ClubSummaryJpaRepository clubSummaryJpaRepository;
  private final ClubTagJpaRepository clubTagJpaRepository;

  @Override
  public Club save(Club club) {
    List<ClubTag> clubTags = club.getClubTags();

    ClubEntity clubEntity = ClubMapper.toEntity(club);
    List<ClubTagEntity> clubTagEntities =
        clubTags.stream()
            .map(clubTag -> ClubTagMapper.toEntityWithClubEntity(clubTag, clubEntity))
            .toList();

    ClubEntity savedClubEntity = clubJpaRepository.save(clubEntity);
    clubTagJpaRepository.saveAll(clubTagEntities);
    return ClubMapper.toDomainWithClubTagsAndClubSummaries(savedClubEntity, clubTags, List.of());
  }

  @Override
  public Club findById(String id) {
    ClubEntity clubEntity =
        clubJpaRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));
    List<ClubTagEntity> clubTagEntities = clubTagJpaRepository.findByClubId(id);
    List<ClubSummaryEntity> clubSummaryEntities = clubSummaryJpaRepository.findByClubId(id);

    List<ClubTag> clubTags = clubTagEntities.stream().map(ClubTagMapper::toDomain).toList();

    List<ClubSummary> clubSummaries =
        clubSummaryEntities.stream().map(ClubSummaryMapper::toDomain).toList();

    return ClubMapper.toDomainWithClubTagsAndClubSummaries(clubEntity, clubTags, clubSummaries);
  }

  @Override
  public List<Club> findAll() {
    List<Club> clubs = new ArrayList<>();
    List<ClubEntity> clubEntities = clubJpaRepository.findAll();

    List<ClubTagEntity> clubTagEntities = clubTagJpaRepository.findAll();
    List<ClubSummaryEntity> clubSummaryEntities = clubSummaryJpaRepository.findAll();

    for (ClubEntity clubEntity : clubEntities) {
      List<ClubTag> clubTags =
          clubTagEntities.stream()
              .filter(
                  clubTagEntity -> clubTagEntity.getClubEntity().getId().equals(clubEntity.getId()))
              .map(ClubTagMapper::toDomain)
              .toList();

      List<ClubSummary> clubSummaries =
          clubSummaryEntities.stream()
              .filter(
                  clubSummaryEntity ->
                      clubSummaryEntity.getClubEntity().getId().equals(clubEntity.getId()))
              .map(ClubSummaryMapper::toDomain)
              .toList();

      clubs.add(
          ClubMapper.toDomainWithClubTagsAndClubSummaries(clubEntity, clubTags, clubSummaries));
    }
    return clubs;
  }
}
