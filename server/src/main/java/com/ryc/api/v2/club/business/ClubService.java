package com.ryc.api.v2.club.business;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.enums.Role;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;
  private final AuthService authService;

  @Transactional
  public ClubCreateResponse createClub(ClubCreateRequest body) {
    final Club club = Club.initialize(body);

    if (clubRepository.existsByName(club.getName())) {
      throw new IllegalArgumentException("Club with name already exists: " + club.getName());
    }

    final Club savedClub = clubRepository.save(club);

    Admin currentUser = authService.getCurrentUser();
    clubRepository.assignRole(savedClub, currentUser, Role.OWNER);

    return ClubCreateResponse.builder().clubId(savedClub.getId()).build();
  }

  @Transactional
  public ClubUpdateResponse updateClub(String id, ClubUpdateRequest body) {
    Club previousClub =
        clubRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));
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
  public ClubGetResponse getClub(String clubId) {
    Club club =
        clubRepository
            .findById(clubId)
            .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + clubId));

    String detailDescription = club.getDetailDescription();
    if (detailDescription.isBlank()) {
      detailDescription = club.getShortDescription();
    }

    return ClubGetResponse.builder()
        .name(club.getName())
        .detailDescription(detailDescription)
        .imageUrl(club.getImageUrl())
        .thumbnailUrl(club.getThumbnailUrl())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .clubDetailImages(club.getClubDetailImages())
        .build();
  }

  @Transactional(readOnly = true)
  public List<Club> getAllClub() {
    return clubRepository.findAll();
  }
}
