package com.ryc.api.v2.club.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.aop.dto.ClubRoleSecuredDto;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.role.domain.enums.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;

  @Transactional
  public Club createClub(ClubCreateRequest body) {
    Club club = Club.initialize(body.name(), body.imageUrl(), body.thumbnailUrl(), body.category());

    if (clubRepository.existsByName(club.getName())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    return clubRepository.save(club);
  }

  @Transactional
  @HasRole(Role.MEMBER)
  public ClubUpdateResponse updateClub(
      ClubRoleSecuredDto clubRoleSecuredDto, ClubUpdateRequest body) {
    Club previousClub =
        clubRepository
            .findById(clubRoleSecuredDto.clubId())
            .orElseThrow(() -> new ClubException(ClubErrorCode.CLUB_NOT_FOUND));

    if (body.name() != null && clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club newClub = previousClub.update(body);
    Club savedClub = clubRepository.save(newClub);

    return ClubUpdateResponse.builder()
        .name(savedClub.getName())
        .shortDescription(savedClub.getShortDescription())
        .detailDescription(savedClub.getDetailDescription())
        .imageUrl(savedClub.getImageUrl())
        .thumbnailUrl(savedClub.getThumbnailUrl())
        .category(savedClub.getCategory())
        .clubTags(savedClub.getClubTags())
        .clubSummaries(savedClub.getClubSummaries())
        .clubDetailImages(savedClub.getClubDetailImages())
        .build();
  }

  @Transactional(readOnly = true)
  public List<Club> getAllClub() {
    return clubRepository.findAll();
  }

  @Transactional(readOnly = true)
  public ClubGetResponse getClubResponse(String clubId) {
    Club club = getClubById(clubId);
    return ClubGetResponse.builder()
        .name(club.getName())
        .detailDescription(club.getDetailDescription())
        .imageUrl(club.getImageUrl())
        .thumbnailUrl(club.getThumbnailUrl())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .clubDetailImages(club.getClubDetailImages())
        .build();
  }

  @Transactional(readOnly = true)
  public Club getClubById(String clubId) {
    return clubRepository
        .findById(clubId)
        .orElseThrow(() -> new ClubException(ClubErrorCode.CLUB_NOT_FOUND));
  }

  @Transactional(readOnly = true)
  public boolean isValidClubId(String clubId) {
    return clubRepository.existsById(clubId);
  }
}
