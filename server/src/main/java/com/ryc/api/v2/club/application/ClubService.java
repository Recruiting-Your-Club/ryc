package com.ryc.api.v2.club.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubDetailImage;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.role.domain.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;
  private final AuthService authService;

  @Transactional
  public ClubCreateResponse createClub(String adminId, ClubCreateRequest body) {
    final Club club = Club.initialize(body);

    if (clubRepository.existsByName(club.getName())) {
      throw new IllegalArgumentException("Club with name already exists: " + club.getName());
    }

    final Club savedClub = clubRepository.save(club);

    Admin currentUser = authService.getAdminById(adminId);
    clubRepository.assignRole(savedClub, currentUser, Role.OWNER);

    return ClubCreateResponse.builder().clubId(savedClub.getId()).build();
  }

  @Transactional
  public ClubUpdateResponse updateClub(String id, ClubUpdateRequest body) {
    // TODO: 사용자 인가 확인하기
    Club previousClub =
        clubRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Club not found with id: " + id));

    String name = body.name().orElse(previousClub.getName());
    String shortDescription = body.shortDescription().orElse(previousClub.getShortDescription());
    String detailDescription = body.detailDescription().orElse(previousClub.getDetailDescription());
    String imageUrl = body.imageUrl().orElse(previousClub.getImageUrl());
    String thumbnailUrl = body.thumbnailUrl().orElse(previousClub.getThumbnailUrl());
    Category category =
        Category.valueOf(body.category().orElse(previousClub.getCategory().toString()));
    List<ClubTag> clubTags = body.clubTags();
    List<ClubSummary> clubSummaries = body.clubSummaries();
    List<ClubDetailImage> clubDetailImages = body.clubDetailImages();

    Club newClub =
        Club.builder()
            .id(id)
            .name(name)
            .shortDescription(shortDescription)
            .detailDescription(detailDescription)
            .imageUrl(imageUrl)
            .thumbnailUrl(thumbnailUrl)
            .category(category)
            .clubTags(clubTags)
            .clubSummaries(clubSummaries)
            .clubDetailImages(clubDetailImages)
            .build();

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
    // TODO: N + 1 문제 발생 중
    return clubRepository.findAll();
  }
}
