package com.ryc.api.v2.club.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Collections;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.event.ApplicationEvents;
import org.springframework.test.context.event.RecordApplicationEvents;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.domain.event.ClubDeletedEvent;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.club.presentation.dto.response.DetailClubResponse;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.role.service.ClubRoleService;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@RecordApplicationEvents
class ClubCommandServiceTest {

  @Autowired ClubCommandService clubCommandService;
  @Autowired AuthService authService;
  @Autowired ClubRoleService clubRoleService;
  @Autowired ClubQueryService clubQueryService;
  @Autowired ApplicationEvents applicationEvents;

  @Test
  @DisplayName("Club을 생성한다.")
  void createClub_givenValidRequest_returnsClubId() {
    // given
    ClubCreateRequest clubCreateRequest =
        createClubCreateRequest("test-club", Category.ACADEMIC.toString());
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");

    String adminId = authService.register(registerRequest).adminId();

    // when
    ClubCreateResponse clubResponse = clubCommandService.createClub(adminId, clubCreateRequest);

    // then
    assertThat(clubResponse.clubId()).isNotNull();
  }

  @Test
  @DisplayName("Club을 생성하는 Admin은 해당 Club의 OWNER가 된다.")
  void createClub_givenAdmin_assignedOwnerRole() {
    // given
    ClubCreateRequest clubCreateRequest =
        createClubCreateRequest("test-club", Category.ACADEMIC.toString());
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");

    String adminId = authService.register(registerRequest).adminId();
    String clubId = clubCommandService.createClub(adminId, clubCreateRequest).clubId();

    // when
    boolean hasOwnerRole = clubRoleService.hasOwnerRole(adminId, clubId);

    // then
    assertTrue(hasOwnerRole);
  }

  @Test
  @DisplayName("중복된 이름으로 Club 생성 시 예외가 발생한다.")
  void createClub_givenDuplicateName_throwsClubException() {
    // given
    ClubCreateRequest clubCreateRequest =
        createClubCreateRequest("test-club", Category.ACADEMIC.toString());
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");

    String adminId = authService.register(registerRequest).adminId();
    clubCommandService.createClub(adminId, clubCreateRequest);

    // when && then
    assertThrows(
        ClubException.class, () -> clubCommandService.createClub(adminId, clubCreateRequest));
  }

  @Test
  @DisplayName("Club 정보를 수정한다.")
  void updateClub_givenValidRequest_returnsUpdatedClubDetails() {
    // given
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");
    String adminId = authService.register(registerRequest).adminId();
    ClubCreateRequest createRequest =
        createClubCreateRequest("initial-club-name", Category.ACADEMIC.toString());
    String clubId = clubCommandService.createClub(adminId, createRequest).clubId();

    String newName = "updated-club-name";
    String newCategory = Category.SPORTS.toString();
    String newShortDescription = "updated short description";
    String newDetailDescription = "updated detail description";

    ClubUpdateRequest updateRequest =
        ClubUpdateRequest.builder()
            .name(newName)
            .category(newCategory)
            .shortDescription(newShortDescription)
            .detailDescription(newDetailDescription)
            .representativeImage(null)
            .clubDetailImages(Collections.emptyList())
            .clubTags(Collections.emptyList())
            .clubSummaries(Collections.emptyList())
            .build();

    // when
    DetailClubResponse updatedClubResponse = clubCommandService.updateClub(clubId, updateRequest);

    // then
    assertThat(updatedClubResponse.name()).isEqualTo(newName);
    assertThat(updatedClubResponse.category().toString()).isEqualTo(newCategory);
    assertThat(updatedClubResponse.shortDescription()).isEqualTo(newShortDescription);
    assertThat(updatedClubResponse.detailDescription()).isEqualTo(newDetailDescription);
  }

  @Test
  @DisplayName("이미 존재하는 이름으로 Club 정보 수정 시 예외가 발생한다.")
  void updateClub_givenDuplicateName_throwsClubException() {
    // given
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");
    String adminId = authService.register(registerRequest).adminId();

    ClubCreateRequest createRequest1 =
        createClubCreateRequest("club-1", Category.ACADEMIC.toString());
    clubCommandService.createClub(adminId, createRequest1);

    ClubCreateRequest createRequest2 =
        createClubCreateRequest("club-2", Category.ACADEMIC.toString());
    String club2Id = clubCommandService.createClub(adminId, createRequest2).clubId();

    ClubUpdateRequest updateRequest =
        ClubUpdateRequest.builder()
            .name("club-1")
            .category(Category.SPORTS.toString())
            .shortDescription("short")
            .detailDescription("detail")
            .build();

    // when && then
    assertThrows(ClubException.class, () -> clubCommandService.updateClub(club2Id, updateRequest));
  }

  @Test
  @DisplayName("Club을 삭제한다.")
  void deleteClub_givenClubId_deleteClub() {
    // given
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");
    String adminId = authService.register(registerRequest).adminId();

    ClubCreateRequest createRequest1 =
        createClubCreateRequest("test-club", Category.ACADEMIC.toString());
    String clubId = clubCommandService.createClub(adminId, createRequest1).clubId();

    // when
    clubCommandService.deleteClub(clubId);

    // then
    assertFalse(clubQueryService.existClubById(clubId));
  }

  @Test
  @DisplayName("Club 삭제 시 ClubDeletedEvent가 발행된다.")
  void deleteClub_whenClubExists_publishesClubDeletedEvent() {
    // given
    RegisterRequest registerRequest =
        createRegisterRequest("test-admin", "test@gmail.com", "123456");
    String adminId = authService.register(registerRequest).adminId();
    ClubCreateRequest createRequest =
        createClubCreateRequest("test-club", Category.ACADEMIC.toString());
    String clubId = clubCommandService.createClub(adminId, createRequest).clubId();

    // when
    clubCommandService.deleteClub(clubId);

    // then
    long count = applicationEvents.stream(ClubDeletedEvent.class).count();
    ClubDeletedEvent event =
        applicationEvents.stream(ClubDeletedEvent.class).findFirst().orElseThrow();

    assertThat(count).isEqualTo(1);
    assertThat(event.clubId()).isEqualTo(clubId);
  }

  private RegisterRequest createRegisterRequest(String name, String email, String password) {
    return RegisterRequest.builder().name(name).email(email).password(password).build();
  }

  private ClubCreateRequest createClubCreateRequest(String clubName, String category) {
    return ClubCreateRequest.builder().name(clubName).category(category).build();
  }
}
