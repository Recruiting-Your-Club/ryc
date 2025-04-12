package com.ryc.api.v2.club.infra;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubTagJpaRepository;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.club.infra.mapper.ClubTagMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepository {
  private final ClubJpaRepository clubJpaRepository;
  private final ClubTagJpaRepository clubTagJpaRepository;

  @Override
  public Club save(Club club) {
    ClubEntity savedClubEntity = clubJpaRepository.save(ClubMapper.toEntity(club));

    final List<ClubTagEntity> clubTagEntities =
        club.getClubTags().stream()
            .map(clubTag -> ClubTagMapper.toEntity(clubTag, savedClubEntity))
            .toList();

    List<ClubTagEntity> savedClubTagEntities = clubTagJpaRepository.saveAll(clubTagEntities);

    return ClubMapper.toDomainWithClubTagEntities(savedClubEntity, savedClubTagEntities);
  }

  @Override
  public Optional<Club> findById(String id) {
    Optional<ClubEntity> clubEntity = clubJpaRepository.findById(id);
    List<ClubTagEntity> clubTagEntities =
        clubTagJpaRepository.findAllByClubId(id);

    return clubEntity.map(entity -> ClubMapper.toDomainWithClubTagEntities(entity, clubTagEntities));
  }
}
