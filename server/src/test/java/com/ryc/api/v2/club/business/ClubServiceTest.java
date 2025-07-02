package com.ryc.api.v2.club.business;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.domain.vo.ClubTag;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.ClubGetResponse;
import com.ryc.api.v2.role.business.RoleService;
import com.ryc.api.v2.role.domain.Role;
import com.ryc.api.v2.security.dto.CustomUserDetail;

@ExtendWith(MockitoExtension.class)
class ClubServiceTest {

  @Mock private ClubRepository clubRepository;
  @Mock private AuthService authService;
  @Mock private RoleService roleService;

  @InjectMocks private ClubService clubService;

  private Club testClub;
  private List<ClubTag> testTags;
  private Admin testAdmin;

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

    testAdmin =
        Admin.builder()
            .id("test-id")
            .name("Test Admin")
            .email("test@gmail.com")
            .password("password")
            .imageUrl("http://example.com/admin.jpg")
            .thumbnailUrl("http://example.com/admin_thumbnail.jpg")
            .build();
  }

  @Test
  @DisplayName("클럽 생성 서비스 테스트")
  void givenValidClubCreateRequest_whenCreateClub_thenReturnCreatedResponse() {
    // Given
    ClubCreateRequest request =
        ClubCreateRequest.builder()
            .name("Test Club")
            .category(Category.ACADEMIC)
            .imageUrl("http://example.com/image.jpg")
            .build();

    when(clubRepository.save(any(Club.class))).thenReturn(testClub);
    when(authService.getCurrentUser()).thenReturn(testAdmin);
    when(roleService.assignRole(any(Admin.class), any(Club.class), any(Role.class)))
        .thenReturn(Role.OWNER); // Mocking role assignment

    // When
    ClubCreateResponse response = clubService.createClub(request);

    // Then
    assertThat(response.clubId()).isEqualTo(testClub.id());
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
            .shortDescription(Optional.of(testClub.shortDescription()))
            .detailDescription(Optional.of(testClub.detailDescription()))
            .imageUrl(Optional.of(testClub.imageUrl()))
            .thumbnailUrl(Optional.of(testClub.thumbnailUrl()))
            .category(Optional.of(testClub.category().toString()))
            .clubTags(testClub.clubTags())
            .clubSummaries(testClub.clubSummaries())
            .clubDetailImages(testClub.clubDetailImages())
            .build();

    Club updatedClub =
        Club.builder()
            .id(clubId)
            .name(newName)
            .shortDescription(testClub.shortDescription())
            .detailDescription(testClub.detailDescription())
            .imageUrl(testClub.imageUrl())
            .thumbnailUrl(testClub.thumbnailUrl())
            .category(testClub.category())
            .clubTags(testClub.clubTags())
            .clubSummaries(testClub.clubSummaries())
            .clubDetailImages(testClub.clubDetailImages())
            .build();

    CustomUserDetail userDetail = new CustomUserDetail(testAdmin);

    when(authService.getCurrentUser()).thenReturn(testAdmin);
    when(roleService.hasRole(userDetail.getId(), clubId)).thenReturn(true);

    when(clubRepository.findById(clubId)).thenReturn(Optional.of(testClub));
    when(clubRepository.save(any(Club.class))).thenReturn(updatedClub);

    // When
    //    ClubUpdateResponse response = clubService.updateClub(userDetail, clubId, request);

    // Then
    //    assertThat(response.name()).isEqualTo(newName);
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
    assertThat(response.name()).isEqualTo(testClub.name());
  }

  @Test
  @DisplayName("ID로 클럽 조회 실패 테스트")
  void givenNonExistentClubId_whenGetClub_thenThrowException() {
    // Given
    String nonExistentId = "non-existent-id";
    when(clubRepository.findById(nonExistentId)).thenReturn(Optional.empty());

    // When & Then
    assertThatThrownBy(() -> clubService.getClub(nonExistentId))
        .isInstanceOf(NoSuchElementException.class)
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
    when(clubRepository.findAll()).thenReturn(List.of(testClub));

    // When
    List<Club> responses = clubService.getAllClub();

    // Then
    assertThat(responses).hasSize(1);
  }
}
