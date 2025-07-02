package com.ryc.api.v2.club.infra;

import static org.assertj.core.api.Assertions.assertThat;
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

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.RoleEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.jpa.RoleJpaRepository;
import com.ryc.api.v2.club.infra.mapper.RoleMapper;
import com.ryc.api.v2.role.domain.Role;

@ExtendWith(MockitoExtension.class)
class ClubRepositoryImplTest {

  @Mock private ClubJpaRepository clubJpaRepository;
  @Mock private RoleJpaRepository roleJpaRepository;

  @InjectMocks private ClubRepositoryImpl clubRepository;

  private Club testClub;
  private ClubEntity testClubEntity;

  @BeforeEach
  void setUp() {
    List<ClubTag> testTags =
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

    // Create a ClubEntity using the builder pattern
    testClubEntity =
        ClubEntity.builder()
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
            .deleted(false)
            .build();
  }

  @Test
  @DisplayName("클럽 저장 테스트")
  void givenValidClub_whenSave_thenReturnSavedClub() {
    // Given
    when(clubJpaRepository.save(any(ClubEntity.class))).thenReturn(testClubEntity);

    // When
    Club savedClub = clubRepository.save(testClub);

    // Then
    assertThat(savedClub)
        .usingRecursiveComparison()
        .ignoringFields("createdAt", "updatedAt")
        .isEqualTo(testClub);
  }

  @Test
  @DisplayName("ID로 클럽 조회 테스트")
  void givenValidClubId_whenFindById_thenReturnClub() {
    // Given
    String clubId = "test-id";
    when(clubJpaRepository.findById(clubId)).thenReturn(Optional.of(testClubEntity));

    // When
    Optional<Club> foundClub = clubRepository.findById(clubId);

    // Then
    assertThat(foundClub).isNotEmpty();
    assertThat(foundClub.get().getId()).isEqualTo(testClub.getId());
  }

  @Test
  @DisplayName("모든 클럽 조회 테스트")
  void givenExistingClubs_whenFindAllClub_thenReturnAllClub() {
    // Given
    List<ClubEntity> clubEntities = List.of(testClubEntity);
    when(clubJpaRepository.findAll()).thenReturn(clubEntities);

    // When
    List<Club> clubs = clubRepository.findAll();

    // Then
    assertThat(clubs).hasSize(1);
  }

  @Test
  void givenValidClubAndAdmin_whenAssignRole_thenReturnAssignedRole() {
    // Given
    String clubId = "test-club-id";
    String adminId = "test-admin-id";
    Club club = Club.builder().id(clubId).build();
    Admin admin = Admin.builder().id(adminId).build();
    Role role = Role.OWNER;

    when(roleJpaRepository.save(any(RoleEntity.class)))
        .thenReturn(RoleMapper.toEntity(role, club, admin));

    // When
    Role assignedRole = clubRepository.assignRole(club, admin, role);

    // Then
    assertThat(assignedRole.toString()).isEqualTo("OWNER");
  }
}
