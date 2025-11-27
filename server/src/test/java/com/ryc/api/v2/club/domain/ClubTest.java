package com.ryc.api.v2.club.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubSummaryRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubTagRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;

class ClubTest {

  @Test
  @DisplayName("Club을 업데이트한다.")
  void update() {
    // given
    String clubName = "test-club";
    String sortDescription = "test-sort-description";
    String detailDescription = "test-detail-description";
    String category = Category.ACADEMIC.toString();

    List<ClubTagRequest> clubTagRequests =
        List.of(ClubTagRequest.builder().id(UUID.randomUUID().toString()).name("test-tag").build());

    List<ClubSummaryRequest> clubSummaryRequests =
        List.of(
            ClubSummaryRequest.builder()
                .id(UUID.randomUUID().toString())
                .title("test-title")
                .content("test-content")
                .build());

    ClubUpdateRequest clubUpdateRequest =
        ClubUpdateRequest.builder()
            .name(clubName)
            .shortDescription(sortDescription)
            .detailDescription(detailDescription)
            .category(category)
            .clubTags(clubTagRequests)
            .clubSummaries(clubSummaryRequests)
            .build();

    Club originalClub = Club.initialize("original-club", Category.SPORTS.toString());

    // when
    Club updatedClub = originalClub.update(clubUpdateRequest);

    // then
    assertThat(updatedClub.getName()).isEqualTo(clubName);
    assertThat(updatedClub.getShortDescription()).isEqualTo(sortDescription);
    assertThat(updatedClub.getDetailDescription()).isEqualTo(detailDescription);
    assertThat(updatedClub.getCategory().toString()).isEqualTo(category);
    assertThat(updatedClub.getClubTags()).hasSize(1);
    assertThat(updatedClub.getClubSummaries()).hasSize(1);
  }
}
