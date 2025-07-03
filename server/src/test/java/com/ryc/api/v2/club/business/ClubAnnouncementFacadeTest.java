package com.ryc.api.v2.club.business;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.service.AnnouncementService;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;

@ExtendWith(MockitoExtension.class)
class ClubAnnouncementFacadeTest {

  @Mock private ClubService clubService;
  @Mock private AnnouncementService announcementService;
  @InjectMocks private ClubAnnouncementFacade clubAnnouncementFacade;

  @Test
  @DisplayName("동아리 목록 조회 시 공고 상태도 함께 반환하는 Facade 테스트")
  void givenClubsAndAnnouncements_whenGetAllClubs_thenReturnsClubsWithStatuses() {
    // Given
    String clubId1 = "1", clubId2 = "2";
    List<Club> clubs =
        List.of(
            Club.builder().id(clubId1).name("Test Club").build(),
            Club.builder().id(clubId2).name("Test Club").build());
    when(clubService.getAllClub()).thenReturn(clubs);
    when(announcementService.getStatusesByClubIds(List.of(clubId1, clubId2)))
        .thenReturn(
            Map.of(clubId1, AnnouncementStatus.CLOSED, clubId2, AnnouncementStatus.RECRUITING));

    // When
    List<AllClubGetResponse> response = clubAnnouncementFacade.getAllClubWithAnnouncementStatus();

    // Then
    assertThat(response.stream().map(AllClubGetResponse::id)).containsExactly(clubId1, clubId2);

    assertThat(response.stream().map(AllClubGetResponse::announcementStatus))
        .containsExactly(AnnouncementStatus.CLOSED, AnnouncementStatus.RECRUITING);
  }
}
