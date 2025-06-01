package com.ryc.api.v2.club.business;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClubAnnouncementFacade {

  private final ClubService clubService;
  private final AnnouncementService announcementService;

  @Transactional(readOnly = true)
  public List<AllClubGetResponse> getAllClubWithAnnouncementStatus() {
    // TODO: N + 1 문제 발생 중
    List<Club> clubs = clubService.getAllClub();

    return clubs.stream()
        .map(
            club -> {
              AnnouncementStatus status = announcementService.getStatusByClubId(club.getId());
              return AllClubGetResponse.builder()
                  .id(club.getId())
                  .name(club.getName())
                  .shortDescription(club.getShortDescription())
                  .imageUrl(club.getImageUrl())
                  .thumbnailUrl(club.getThumbnailUrl())
                  .category(club.getCategory())
                  .clubTags(club.getClubTags())
                  .announcementStatus(status)
                  .build();
            })
        .toList();
  }
}
