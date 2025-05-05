package com.ryc.api.v2.club.infra;

import java.util.*;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.*;
import com.ryc.api.v2.club.infra.entity.ClubDetailImageEntity;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;
import com.ryc.api.v2.club.infra.jpa.ClubDetailImageJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubSummaryJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubTagJpaRepository;
import com.ryc.api.v2.club.infra.mapper.ClubDetailImageMapper;
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
  private final ClubDetailImageJpaRepository clubDetailImageJpaRepository;

  @Override
  public Club save(Club club) {
    List<ClubTag> clubTags = club.getClubTags();

    ClubEntity clubEntity = ClubMapper.toEntity(club);
    ClubEntity savedClubEntity = clubJpaRepository.save(clubEntity);

    List<ClubTagEntity> clubTagEntities =
        clubTags.stream()
            .map(clubTag -> ClubTagMapper.toEntityWithClubEntity(clubTag, savedClubEntity))
            .toList();

    clubTagJpaRepository.saveAll(clubTagEntities);
    return ClubMapper.toDomain(savedClubEntity, clubTags, new ArrayList<>(), new ArrayList<>());
  }

  @Override
  public Club findById(String id) {
    ClubEntity clubEntity =
        clubJpaRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));
    List<ClubTagEntity> clubTagEntities = clubTagJpaRepository.findByClubId(id);
    List<ClubSummaryEntity> clubSummaryEntities = clubSummaryJpaRepository.findByClubId(id);
    List<ClubDetailImageEntity> clubDetailImageEntities =
        clubDetailImageJpaRepository.findByClubId(id);

    List<ClubTag> clubTags = clubTagEntities.stream().map(ClubTagMapper::toDomain).toList();
    List<ClubSummary> clubSummaries =
        clubSummaryEntities.stream().map(ClubSummaryMapper::toDomain).toList();
    List<ClubDetailImage> clubDetailImages =
        clubDetailImageEntities.stream().map(ClubDetailImageMapper::toDomain).toList();

    return ClubMapper.toDomain(clubEntity, clubTags, clubSummaries, clubDetailImages);
  }

  @Override
  public List<Club> findAll() {
    List<Club> clubs = new ArrayList<>();
    List<ClubEntity> clubEntities = clubJpaRepository.findAll();

    List<ClubTagEntity> clubTagEntities = clubTagJpaRepository.findAll();
    List<ClubSummaryEntity> clubSummaryEntities = clubSummaryJpaRepository.findAll();
    List<ClubDetailImageEntity> clubDetailImageEntities = clubDetailImageJpaRepository.findAll();

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

      List<ClubDetailImage> clubDetailImages =
          clubDetailImageEntities.stream()
              .filter(
                  clubDetailImageEntity ->
                      clubDetailImageEntity.getClubEntity().getId().equals(clubEntity.getId()))
              .map(ClubDetailImageMapper::toDomain)
              .toList();

      clubs.add(ClubMapper.toDomain(clubEntity, clubTags, clubSummaries, clubDetailImages));
    }
    return clubs;
  }
}
