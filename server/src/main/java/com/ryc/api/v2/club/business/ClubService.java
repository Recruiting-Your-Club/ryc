package com.ryc.api.v2.club.business;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;
import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.role.business.RoleService;
import com.ryc.api.v2.role.domain.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubService {

  private final ClubRepository clubRepository;
  private final AuthService authService;

  private final RoleService roleService;

  @Transactional
  public ClubCreateResponse createClub(ClubCreateRequest body) {
    final Club club =
        Club.initialize(body.name(), body.imageUrl(), body.thumbnailUrl(), body.category());

    if (clubRepository.existsByName(club.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    final Club savedClub = clubRepository.save(club);

    Admin currentUser = authService.getCurrentUser();
    roleService.assignRole(currentUser, savedClub, Role.OWNER);

    return ClubCreateResponse.builder().clubId(savedClub.id()).build();
  }

  @Transactional
  @HasRole(Role.MEMBER)
  public ClubUpdateResponse updateClub(
      CustomUserDetail userDetail, String clubId, ClubUpdateRequest body) {
    Club previousClub =
        clubRepository
            .findById(clubId)
            .orElseThrow(() -> new ClubException(ClubErrorCode.CLUB_NOT_FOUND));
    Club newClub = previousClub.update(body);

    if (clubRepository.existsByName(newClub.name())) {
      throw new ClubException(ClubErrorCode.DUPLICATE_CLUB_NAME);
    }

    Club savedClub = clubRepository.save(newClub);

    return ClubUpdateResponse.builder()
        .name(savedClub.name())
        .shortDescription(savedClub.shortDescription())
        .detailDescription(savedClub.detailDescription())
        .imageUrl(savedClub.imageUrl())
        .thumbnailUrl(savedClub.thumbnailUrl())
        .category(savedClub.category())
        .clubTags(savedClub.clubTags())
        .clubSummaries(savedClub.clubSummaries())
        .clubDetailImages(savedClub.clubDetailImages())
        .build();
  }

  @Transactional(readOnly = true)
  public ClubGetResponse getClub(String clubId) {
    Club club =
        clubRepository
            .findById(clubId)
            .orElseThrow(() -> new ClubException(ClubErrorCode.CLUB_NOT_FOUND));

    String detailDescription = club.detailDescription();
    if (detailDescription.isBlank()) {
      detailDescription = club.shortDescription();
    }

    return ClubGetResponse.builder()
        .name(club.name())
        .detailDescription(detailDescription)
        .imageUrl(club.imageUrl())
        .thumbnailUrl(club.thumbnailUrl())
        .category(club.category())
        .clubTags(club.clubTags())
        .clubSummaries(club.clubSummaries())
        .clubDetailImages(club.clubDetailImages())
        .build();
  }

  @Transactional(readOnly = true)
  public List<Club> getAllClub() {
    return clubRepository.findAll();
  }
}
