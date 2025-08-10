package com.ryc.api.v2.club.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;
  private final FileService fileService;

  @Transactional
  public Club createClub(ClubCreateRequest body) {
    Club club = Club.initialize(body.name(), body.category());

    List<String> imageIds = new ArrayList<>();
    imageIds.add(body.representativeImage());

    if (clubRepository.existsByName(club.getName())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club savedClub = clubRepository.save(club);
    fileService.claimOwnershipAsync(imageIds, savedClub.getId());
    return savedClub;
  }

  @Transactional
  public ClubUpdateResponse updateClub(String clubId, ClubUpdateRequest body) {
    Club previousClub = clubRepository.findById(clubId);

    if (body.name() != null && clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club newClub = previousClub.update(body);
    Club savedClub = clubRepository.save(newClub);

    List<String> imageIds = new ArrayList<>(body.clubImages());

    imageIds.add(body.representativeImage());

    fileService.claimOwnershipSync(imageIds, savedClub.getId());

    List<FileMetaData> images = fileService.findAllByAssociatedId(savedClub.getId());
    FileGetResponse representativeImage =
        images.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)))
            .orElse(null);

    List<FileGetResponse> detailImages =
        images.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_IMAGE)
            .map(image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)))
            .toList();

    return ClubUpdateResponse.builder()
        .name(savedClub.getName())
        .representativeImage(representativeImage)
        .shortDescription(savedClub.getShortDescription())
        .detailDescription(savedClub.getDetailDescription())
        .category(savedClub.getCategory())
        .clubTags(savedClub.getClubTags())
        .clubSummaries(savedClub.getClubSummaries())
        .clubDetailImages(detailImages)
        .build();
  }

  @Transactional(readOnly = true)
  public List<Club> getAllClub() {
    return clubRepository.findAll();
  }

  @Transactional(readOnly = true)
  public ClubGetResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);
    FileGetResponse representativeImage =
        fileService.findAllByAssociatedId(clubId).stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)))
            .orElse(null);

    return ClubGetResponse.builder()
        .name(club.getName())
        .detailDescription(club.getDetailDescription())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .representativeImage(representativeImage)
        .build();
  }

  @Transactional(readOnly = true)
  public boolean isValidClubId(String clubId) {
    return clubRepository.existsById(clubId);
  }
}
