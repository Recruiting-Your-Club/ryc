package com.ryc.api.v2.club.service;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.service.dto.ClubImageDTO;
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

    ClubImageDTO clubImageResponse = getClubImageDTO(savedClub.getId());
    return createDetailClubResponse(savedClub, clubImageResponse);
  }

  @Transactional(readOnly = true)
  public List<Club> getAllClub() {
    return clubRepository.findAll();
  }

  @Transactional(readOnly = true)
  public DetailClubResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);

    ClubImageDTO clubImageResponse = getClubImageDTO(clubId);
    return createDetailClubResponse(club, clubImageResponse);
  }

  @Transactional(readOnly = true)
  public boolean existClubById(String clubId) {
    return clubRepository.existsById(clubId);
  }

  @Transactional
  public void deleteClub(String id) {
    clubRepository.deleteById(id);
  }

  @Transactional(readOnly = true)
  public ClubImageDTO getClubImageDTO(String clubId) {
    List<FileMetaData> images = fileService.findAllByAssociatedId(clubId);

    FileGetResponse profileImage =
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

    return new ClubImageDTO(profileImage, detailImages);
  }

  @Transactional(readOnly = true)
  public Map<String, ClubImageDTO> getClubImageDTOs(List<String> clubIds) {
    List<FileMetaData> images = fileService.findAllByAssociatedIdIn(clubIds);

    Map<String, FileGetResponse> representativeImageMap =
        images.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_PROFILE)
            .collect(
                Collectors.toMap(
                    FileMetaData::getAssociatedId,
                    image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image))));

    Map<String, List<FileGetResponse>> detailImageMap =
        images.stream()
            .filter(image -> image.getFileDomainType() == FileDomainType.CLUB_IMAGE)
            .collect(
                Collectors.groupingBy(
                    FileMetaData::getAssociatedId,
                    Collectors.mapping(
                        image -> FileGetResponse.of(image, fileService.getPublicFileGetUrl(image)),
                        toList())));

    return clubIds.stream()
        .collect(
            Collectors.toMap(
                clubId -> clubId,
                clubId ->
                    new ClubImageDTO(
                        representativeImageMap.get(clubId), detailImageMap.get(clubId))));
  }

  public DetailClubResponse createDetailClubResponse(Club club, ClubImageDTO clubImageResponse) {
    return DetailClubResponse.builder()
        .id(club.getId())
        .name(club.getName())
        .shortDescription(club.getShortDescription())
        .detailDescription(club.getDetailDescription())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .representativeImage(clubImageResponse.representativeImage())
        .clubDetailImages(clubImageResponse.detailImages())
        .build();
  }
}
