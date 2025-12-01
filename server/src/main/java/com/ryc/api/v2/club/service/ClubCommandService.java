package com.ryc.api.v2.club.service;

import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.club.service.dto.ClubImageDTO;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.common.util.HtmlImageParser;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.service.ClubRoleService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ClubCommandService {

  private final ClubRepository clubRepository;
  private final AdminRepository adminRepository;
  private final FileService fileService;
  private final ClubRoleService clubRoleService;
  private final ClubQueryService clubQueryService;

  private final HtmlImageParser htmlImageParser;
  private final ApplicationEventPublisher eventPublisher;

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

    ClubImageDTO clubImageResponse = clubQueryService.getClubImageDTO(savedClub.getId());
    return DetailClubResponse.from(savedClub, clubImageResponse);
  }

  public void deleteClub(String id) {
    if (clubQueryService.existClubById(id)) {
      eventPublisher.publishEvent(new ClubDeletedEvent(id));
      clubRepository.deleteById(id);
    }
  }
}
