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
    /**
     * 1. 이미지 저장 및 URL 받아오기 2. ClubTag 리스트 생성 및 Club 객체 생성 3. Club 갹채 및 ClubTags DB 저장 4. 생성한 유저,
     * 운영진 권한 부여 및 저장
     */

    // TODO: 클라이언트에서 받은 이미지 파일 S3 저장 후 ImageUrl, ThumnailUrl 받아오는 프로세스 필요. (추후 아래, "MOCK_URL" 삭제)
    final String ImageUrlFromS3 = "MOCK_URL";
    final String ThumbnailUrlFromS3 = "MOCK_URL";

    final List<ClubTag> clubTags =
        body.tagNames().stream().map(tagName -> ClubTag.builder().name(tagName).build()).toList();

    final Club club = Club.initialize(body, ImageUrlFromS3, ThumbnailUrlFromS3, clubTags);

    final Club savedClub = clubRepository.save(club);

    // TODO: Security Context에서 사용자를 찾고, 해당 사용자에게 MANAGER 권한 부여
    //    final String currentUserId = UserUtil.getCurrentUserId();

    return ClubCreateResponse.builder().clubId(savedClub.getId()).build();
  }

  @Transactional
  public ClubUpdateResponse updateClub(String id, ClubUpdateRequest body) {
    Club previousClub = clubRepository.findById(id);

    String name = body.name().orElse(previousClub.getName());
    String shortDescription = body.shortDescription().orElse(previousClub.getShortDescription());
    String detailDescription = body.detailDescription().orElse(previousClub.getDetailDescription());
    String imageUrl = body.imageUrl().orElse(previousClub.getImageUrl());
    String thumbnailUrl = body.thumbnailUrl().orElse(previousClub.getThumbnailUrl());
    Category category =
        Category.valueOf(body.category().orElse(previousClub.getCategory().toString()));
    List<ClubTag> clubTags = body.clubTags().orElse(previousClub.getClubTags());
    List<ClubSummary> clubSummaries = body.clubSummaries().orElse(previousClub.getClubSummaries());
    List<ClubDetailImage> clubDetailImages =
        body.clubDetailImages().orElse(previousClub.getClubDetailImages());

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
  public ClubGetResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);

    String detailDescription = club.getDetailDescription();
    if (detailDescription.isBlank()) {
      detailDescription = club.getShortDescription();
    }

    return ClubGetResponse.builder()
        .id(club.getId())
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
