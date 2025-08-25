package com.ryc.api.v2.club.service;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.common.util.HtmlImageParser;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;
  private final FileService fileService;
  private final HtmlImageParser htmlImageParser;

  @Transactional
  public Club createClub(ClubCreateRequest body) {
    if (clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }
    Club club = Club.initialize(body.name(), body.category());

    Club savedClub = clubRepository.save(club);

    fileService.claimOwnership(
        body.representativeImage(), savedClub.getId(), FileDomainType.CLUB_PROFILE);
    return savedClub;
  }

  @Transactional
  public DetailClubResponse updateClub(String clubId, ClubUpdateRequest body) {
    Club previousClub = clubRepository.findById(clubId);

    if (!previousClub.getName().equals(body.name()) && clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club newClub = previousClub.update(body);
    Club savedClub = clubRepository.save(newClub);

    List<String> detailDescriptionImages =
        htmlImageParser.extractImageIds(body.detailDescription());

    if (detailDescriptionImages.size() > 10) {
      throw new ClubException(ClubErrorCode.POST_IMAGE_LIMIT_EXCEEDED);
    }
    fileService.claimOwnership(
        detailDescriptionImages, savedClub.getId(), FileDomainType.CLUB_POST_IMAGE);
    fileService.claimOwnership(
        body.clubDetailImages(), savedClub.getId(), FileDomainType.CLUB_IMAGE);
    fileService.claimOwnership(
        body.representativeImage(), savedClub.getId(), FileDomainType.CLUB_PROFILE);

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

    return DetailClubResponse.builder()
        .id(savedClub.getId())
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
  public DetailClubResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);
    FileGetResponse representativeImage =
        fileService.findAllByAssociatedId(clubId).stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)))
            .orElse(null);

    return DetailClubResponse.builder()
        .id(club.getId())
        .name(club.getName())
        .detailDescription(club.getDetailDescription())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .representativeImage(representativeImage)
        .build();
  }

  @Transactional(readOnly = true)
  public boolean existClubById(String clubId) {
    return clubRepository.existsById(clubId);
  }

  @Transactional
  public void deleteClub(String id) {
    clubRepository.deleteById(id);
  }

  public SimpleClubResponse createSimpleClubResponse(
      Club club, Map<String, AnnouncementStatus> statuses) {
    AnnouncementStatus status;

    if (statuses != null && statuses.containsKey(club.getId())) {
      status = statuses.get(club.getId());
    } else {
      status = null;
    }

    FileGetResponse representativeImageResponse =
        fileService.findAllByAssociatedId(club.getId()).stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .findFirst()
            .map(image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)))
            .orElse(null);

    return SimpleClubResponse.builder()
        .id(club.getId())
        .name(club.getName())
        .shortDescription(club.getShortDescription())
        .representativeImage(representativeImageResponse)
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .announcementStatus(status)
        .build();
  }

  @Transactional
  public List<DetailClubResponse> createDetailClubResponses(List<Club> clubs) {
    List<FileMetaData> fileMetaData =
        fileService.findAllByAssociatedIdIn(clubs.stream().map(Club::getId).toList());

    Map<String, FileGetResponse> representativeImageMap =
        fileMetaData.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .collect(
                Collectors.toMap(
                    FileMetaData::getAssociatedId,
                    image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image))));

    Map<String, List<FileGetResponse>> detailImageMap =
        fileMetaData.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_IMAGE)
            .collect(
                Collectors.groupingBy(
                    FileMetaData::getAssociatedId,
                    Collectors.mapping(
                        image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)),
                        toList())));

    return clubs.stream()
        .map(
            club ->
                DetailClubResponse.builder()
                    .id(club.getId())
                    .name(club.getName())
                    .shortDescription(club.getShortDescription())
                    .detailDescription(club.getDetailDescription())
                    .category(club.getCategory())
                    .clubTags(club.getClubTags())
                    .clubSummaries(club.getClubSummaries())
                    .representativeImage(representativeImageMap.get(club.getId()))
                    .clubDetailImages(detailImageMap.get(club.getId()))
                    .build())
        .toList();
  }
}
