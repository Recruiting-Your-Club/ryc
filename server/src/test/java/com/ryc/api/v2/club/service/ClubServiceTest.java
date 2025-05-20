package com.ryc.api.v2.club.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
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
        new ClubCreateRequest(
            "Test Club", "Short description", Category.ACADEMIC, List.of("Tag1", "Tag2"));

    when(clubRepository.save(any(Club.class))).thenReturn(testClub);

    // When
    ClubCreateResponse response = clubService.createClub(request);

    // Then
    assertThat(response).isNotNull();
    assertThat(response.clubId()).isEqualTo(testClub.getId());
    verify(clubRepository, times(1)).save(any(Club.class));
  }

  @Test
  @DisplayName("ID로 클럽 조회 서비스 테스트")
  void givenExistingClubId_whenGetClub_thenReturnClub() {
    // Given
    String clubId = "test-id";
    when(clubRepository.findById(clubId)).thenReturn(testClub);

    // When
    ClubGetResponse response = clubService.getClub(clubId);

    // Then
    assertThat(response).isNotNull();
    assertThat(response.id()).isEqualTo(clubId);
    assertThat(response.name()).isEqualTo(testClub.getName());
    assertThat(response.detailDescription()).isEqualTo(testClub.getDetailDescription());
    assertThat(response.imageUrl()).isEqualTo(testClub.getImageUrl());
    assertThat(response.thumbnailUrl()).isEqualTo(testClub.getThumbnailUrl());
    assertThat(response.category()).isEqualTo(testClub.getCategory());
    assertThat(response.clubTags()).isEqualTo(testClub.getClubTags());
    verify(clubRepository, times(1)).findById(clubId);
  }

  @Test
  @DisplayName("상세 설명이 비어있을 때 짧은 설명을 반환하는 서비스 테스트")
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

    when(clubRepository.findById(clubId)).thenReturn(clubWithEmptyDetail);

    // When
    ClubGetResponse response = clubService.getClub(clubId);

    // Then
    assertThat(response).isNotNull();
    assertThat(response.detailDescription()).isEqualTo("Short description");
    verify(clubRepository, times(1)).findById(clubId);
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
    assertThat(responses).isNotNull();
    assertThat(responses).hasSize(1);
    assertThat(responses.get(0).id()).isEqualTo(testClub.getId());
    assertThat(responses.get(0).name()).isEqualTo(testClub.getName());
    assertThat(responses.get(0).shortDescription()).isEqualTo(testClub.getShortDescription());
    verify(clubRepository, times(1)).findAll();
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
            .clubTags(Optional.of(testClub.getClubTags()))
            .clubSummaries(Optional.of(testClub.getClubSummaries()))
            .clubDetailImages(Optional.of(testClub.getClubDetailImages()))
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

    when(clubRepository.findById(clubId)).thenReturn(testClub);
    when(clubRepository.save(any(Club.class))).thenReturn(updatedClub);

    // When
    ClubUpdateResponse response = clubService.updateClub(clubId, request);

    // Then
    assertThat(response).isNotNull();
    assertThat(response.id()).isEqualTo(clubId);
    assertThat(response.name()).isEqualTo(newName);
    verify(clubRepository, times(1)).findById(clubId);
    verify(clubRepository, times(1)).save(any(Club.class));
  }
}
