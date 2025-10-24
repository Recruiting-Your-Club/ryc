package com.ryc.api.v2.club.service;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.presentation.dto.response.MyClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.club.service.dto.ClubImageDTO;
import com.ryc.api.v2.club.service.dto.MyClubDTO;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.common.util.HtmlImageParser;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.service.ClubRoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;
  private final AdminRepository adminRepository;
  private final FileService fileService;
  private final ClubRoleService clubRoleService;
  private final AnnouncementService announcementService;
  private final HtmlImageParser htmlImageParser;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public ClubCreateResponse createClub(String adminId, ClubCreateRequest body) {
    if (clubRepository.existsByName(body.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club club = Club.initialize(body.name(), body.category());
    Club savedClub = clubRepository.save(club);

    fileService.claimOwnership(
        body.representativeImage(), savedClub.getId(), FileDomainType.CLUB_PROFILE);

    Admin admin = adminRepository.findById(adminId);
    clubRoleService.assignRole(admin, savedClub, Role.OWNER);

    return new ClubCreateResponse(savedClub.getId());
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
  public List<SimpleClubResponse> getAllClubWithAnnouncementStatus() {
    List<Club> clubs = clubRepository.findAll();
    List<String> clubIds = clubs.stream().map(Club::getId).toList();

    Map<String, AnnouncementStatus> statuses = announcementService.getStatusesByClubIds(clubIds);

    Map<String, ClubImageDTO> imageDTOMap = getClubImageDTOs(clubIds);

    return clubs.stream()
        .map(
            club ->
                SimpleClubResponse.builder()
                    .id(club.getId())
                    .name(club.getName())
                    .shortDescription(club.getShortDescription())
                    .representativeImage(imageDTOMap.get(club.getId()).representativeImage())
                    .category(club.getCategory())
                    .clubTags(club.getClubTags())
                    .announcementStatus(statuses.get(club.getId()))
                    .build())
        .toList();
  }

  @Transactional(readOnly = true)
  public DetailClubResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);

    ClubImageDTO clubImageResponse = getClubImageDTO(clubId);
    return createDetailClubResponse(club, clubImageResponse);
  }

  @Transactional(readOnly = true)
  public List<MyClubGetResponse> getMyClubs(String adminId) {
    List<MyClubDTO> myClubDTOS = clubRoleService.getMyClubs(adminId);
    List<String> myClubIds = myClubDTOS.stream().map(dto -> dto.club().getId()).toList();

    Map<String, ClubImageDTO> imageDTOMap = getClubImageDTOs(myClubIds);

    return myClubDTOS.stream()
        .map(
            clubDTO -> {
              DetailClubResponse clubResponse =
                  createDetailClubResponse(clubDTO.club(), imageDTOMap.get(clubDTO.club().getId()));
              return new MyClubGetResponse(clubResponse, clubDTO.role());
            })
        .toList();
  }

  @Transactional(readOnly = true)
  public SimpleClubResponse getClubByInviteCode(String inviteCode) {
    Club club = clubRoleService.getClubByInviteCode(inviteCode);
    ClubImageDTO clubImage = getClubImageDTO(club.getId());
    return SimpleClubResponse.builder()
        .id(club.getId())
        .name(club.getName())
        .shortDescription(club.getShortDescription())
        .representativeImage(clubImage.representativeImage())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .build();
  }

  @Transactional(readOnly = true)
  public boolean existClubById(String clubId) {
    return clubRepository.existsById(clubId);
  }

  @Transactional
  public void deleteClub(String id) {
    if (existClubById(id)) {
      eventPublisher.publishEvent(new ClubDeletedEvent(id));
      clubRepository.deleteById(id);
    }
  }

  @Transactional(readOnly = true)
  protected ClubImageDTO getClubImageDTO(String clubId) {
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
  protected Map<String, ClubImageDTO> getClubImageDTOs(List<String> clubIds) {
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

  private DetailClubResponse createDetailClubResponse(Club club, ClubImageDTO clubImageResponse) {
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
