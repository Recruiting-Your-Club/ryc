package com.ryc.api.v2.club.business;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.AllClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubUpdateResponse;

@ExtendWith(MockitoExtension.class)
class ClubServiceTest {

  @Mock private ClubRepository clubRepository;

  @InjectMocks private ClubService clubService;

  private Club testClub;
  private List<ClubTag> testTags;

  @BeforeEach
  void setUp() {
    testTags =
        List.of(ClubTag.builder().name("Tag1").build(), ClubTag.builder().name("Tag2").build());

    testClub =
        Club.builder()
            .id("test-id")
            .name("Test Club")
            .shortDescription("Short description")
            .detailDescription("Detailed description")
            .imageUrl("http://example.com/image.jpg")
            .thumbnailUrl("http://example.com/thumbnail.jpg")
            .category(Category.ACADEMIC)
            .clubTags(testTags)
            .clubSummaries(new ArrayList<>())
            .clubDetailImages(new ArrayList<>())
            .build();
  }

  @Test
  @DisplayName("클럽 생성 서비스 테스트")
  void givenValidClubCreateRequest_whenCreateClub_thenReturnCreatedResponse() {
    // Given
    ClubCreateRequest request =
        ClubCreateRequest.builder()
            .name("Test Club")
            .shortDescription("Short description")
            .category(Category.ACADEMIC)
            .tagNames(List.of("Tag1", "Tag2"))
            .build();

    when(clubRepository.save(any(Club.class))).thenReturn(testClub);

    // When
    ClubCreateResponse response = clubService.createClub(request);

    // Then
    assertThat(response.clubId()).isEqualTo(testClub.getId());
  }

  @Test
  @DisplayName("클럽 업데이트 서비스 테스트")
  void givenValidClubUpdateRequest_whenUpdateClub_thenReturnUpdatedResponse() {
    // Given
    String clubId = "test-id";
    String newName = "Updated Club";

    ClubUpdateRequest request =
        ClubUpdateRequest.builder()
            .name(Optional.of(newName))
            .shortDescription(Optional.of(testClub.getShortDescription()))
            .detailDescription(Optional.of(testClub.getDetailDescription()))
            .imageUrl(Optional.of(testClub.getImageUrl()))
            .thumbnailUrl(Optional.of(testClub.getThumbnailUrl()))
            .category(Optional.of(testClub.getCategory().toString()))
            .clubTags(testClub.getClubTags())
            .clubSummaries(testClub.getClubSummaries())
            .clubDetailImages(testClub.getClubDetailImages())
            .build();

    Club updatedClub =
        Club.builder()
            .id(clubId)
            .name(newName)
            .shortDescription(testClub.getShortDescription())
            .detailDescription(testClub.getDetailDescription())
            .imageUrl(testClub.getImageUrl())
            .thumbnailUrl(testClub.getThumbnailUrl())
            .category(testClub.getCategory())
            .clubTags(testClub.getClubTags())
            .clubSummaries(testClub.getClubSummaries())
            .clubDetailImages(testClub.getClubDetailImages())
            .build();

    when(clubRepository.findById(clubId)).thenReturn(Optional.of(testClub));
    when(clubRepository.save(any(Club.class))).thenReturn(updatedClub);

    // When
    ClubUpdateResponse response = clubService.updateClub(clubId, request);

    // Then
    assertThat(response.name()).isEqualTo(newName);
  }

  @Test
  @DisplayName("ID로 클럽 조회 서비스 테스트")
  void givenExistingClubId_whenGetClub_thenReturnClub() {
    // Given
    String clubId = "test-id";
    when(clubRepository.findById(clubId)).thenReturn(Optional.of(testClub));

    // When
    ClubGetResponse response = clubService.getClub(clubId);

    // Then
    assertThat(response.name()).isEqualTo(testClub.getName());
  }

  @Test
  @DisplayName("ID로 클럽 조회 실패 테스트")
  void givenNonExistentClubId_whenGetClub_thenThrowException() {
    // Given
    String nonExistentId = "non-existent-id";
    when(clubRepository.findById(nonExistentId)).thenReturn(Optional.empty());

    // When & Then
    assertThatThrownBy(() -> clubService.getClub(nonExistentId))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("Club not found with id: " + nonExistentId);
  }

  @Test
  @DisplayName("상세 설명이 비어있을 때 간단한 설명을 반환하는 서비스 테스트")
  void givenClubWithEmptyDetailDescription_whenGetClub_thenReturnShortDescriptionInstead() {
    // Given
    String clubId = "test-id";
    Club clubWithEmptyDetail =
        Club.builder()
            .id(clubId)
            .name("Test Club")
            .shortDescription("Short description")
            .detailDescription("")
            .imageUrl("http://example.com/image.jpg")
            .thumbnailUrl("http://example.com/thumbnail.jpg")
            .category(Category.ACADEMIC)
            .clubTags(testTags)
            .clubSummaries(new ArrayList<>())
            .clubDetailImages(new ArrayList<>())
            .build();

    when(clubRepository.findById(clubId)).thenReturn(Optional.of(clubWithEmptyDetail));

    // When
    ClubGetResponse response = clubService.getClub(clubId);

    // Then
    assertThat(response.detailDescription()).isEqualTo("Short description");
  }

  @Test
  @DisplayName("모든 클럽 조회 서비스 테스트")
  void givenExistingClubs_whenGetAllClubs_thenReturnAllClubResponse() {
    // Given
    List<Club> clubs = List.of(testClub);
    when(clubRepository.findAll()).thenReturn(clubs);

    // When
    List<AllClubGetResponse> responses = clubService.getAllClub();

    // Then
    assertThat(responses).hasSize(1);
  }
}
