package com.ryc.api.v2.club.business;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ClubAnnouncementFacade {

  private final ClubService clubService;
  private final AnnouncementService announcementService;

  @Transactional(readOnly = true)
  public List<AllClubGetResponse> getAllClubWithAnnouncementStatus() {
    List<Club> clubs = clubService.getAllClub();
    Map<String, AnnouncementStatus> statuses =
        announcementService.getStatusesByClubIds(clubs.stream().map(Club::id).toList());

    return clubs.stream()
        .map(
            club -> {
              AnnouncementStatus status = statuses.get(club.id());
              return AllClubGetResponse.builder()
                  .id(club.id())
                  .name(club.name())
                  .shortDescription(club.shortDescription())
                  .imageUrl(club.imageUrl())
                  .thumbnailUrl(club.thumbnailUrl())
                  .category(club.category())
                  .clubTags(club.clubTags())
                  .announcementStatus(status)
                  .build();
            })
        .toList();
  }
}
