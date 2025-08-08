package com.ryc.api.v2.club.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;

  @Transactional
  public Club createClub(ClubCreateRequest body) {
    if (clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club club = Club.initialize(body.name(), body.imageUrl(), body.thumbnailUrl(), body.category());
    return clubRepository.save(club);
  }

  @Transactional
  public DetailClubResponse updateClub(String clubId, ClubUpdateRequest body) {
    Club previousClub = clubRepository.findById(clubId);

    if (!previousClub.getName().equals(body.name()) && clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club newClub = previousClub.update(body);
    Club savedClub = clubRepository.save(newClub);

    return DetailClubResponse.builder()
        .id(savedClub.getId())
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
  public DetailClubResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);
    return DetailClubResponse.builder()
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
  public boolean existClubById(String clubId) {
    return clubRepository.existsById(clubId);
  }
}
