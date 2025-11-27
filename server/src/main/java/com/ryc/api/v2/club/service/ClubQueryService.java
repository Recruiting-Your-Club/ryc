package com.ryc.api.v2.club.service;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.presentation.dto.response.MyClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.SimpleClubResponse;
import com.ryc.api.v2.club.service.dto.ClubImageDTO;
import com.ryc.api.v2.club.service.dto.MyClubDTO;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.service.ClubRoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubQueryService {

  private final ClubRepository clubRepository;
  private final FileService fileService;
  private final ClubRoleService clubRoleService;
  private final AnnouncementService announcementService;

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

  public DetailClubResponse getClub(String clubId) {
    Club club = clubRepository.findById(clubId);

    ClubImageDTO clubImageResponse = getClubImageDTO(clubId);
    return DetailClubResponse.from(club, clubImageResponse);
  }

  public List<MyClubGetResponse> getMyClubs(String adminId) {
    List<MyClubDTO> myClubDTOS = clubRoleService.getMyClubs(adminId);
    List<String> myClubIds = myClubDTOS.stream().map(dto -> dto.club().getId()).toList();

    Map<String, ClubImageDTO> imageDTOMap = getClubImageDTOs(myClubIds);

    return myClubDTOS.stream()
        .map(
            clubDTO -> {
              DetailClubResponse clubResponse =
                  DetailClubResponse.from(clubDTO.club(), imageDTOMap.get(clubDTO.club().getId()));
              return new MyClubGetResponse(clubResponse, clubDTO.role());
            })
        .toList();
  }

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

  public boolean existClubById(String clubId) {
    return clubRepository.existsById(clubId);
  }

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
}
