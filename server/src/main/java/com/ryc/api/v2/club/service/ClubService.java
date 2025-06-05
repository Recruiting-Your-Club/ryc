package com.ryc.api.v2.club.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.*;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;

  @Transactional
  public ClubCreateResponse createClub(ClubCreateRequest body) {
    final Club club = Club.initialize(body);

    final Club savedClub = clubRepository.save(club);

    // TODO: 사용자에게 MANAGER 권한 부여 (UserClubRole 구현 필요)

    return ClubCreateResponse.builder().clubId(savedClub.getId()).build();
  }

  @Transactional
  public ClubUpdateResponse updateClub(String id, ClubUpdateRequest body) {
    // TODO: 사용자 인가 확인하기
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
  public List<AllClubGetResponse> getAllClub() {
    // TODO: N + 1 문제 발생 중
    List<Club> clubs = clubRepository.findAll();

    return clubs.stream()
        .map(
            club ->
                AllClubGetResponse.builder()
                    .id(club.getId())
                    .name(club.getName())
                    .shortDescription(club.getShortDescription())
                    .imageUrl(club.getImageUrl())
                    .thumbnailUrl(club.getThumbnailUrl())
                    .category(club.getCategory())
                    .clubTags(club.getClubTags())
                    .build())
        .toList();
  }
}
