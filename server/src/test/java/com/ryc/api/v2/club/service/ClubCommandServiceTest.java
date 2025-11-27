package com.ryc.api.v2.club.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.response.ClubCreateResponse;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.role.service.ClubRoleService;

@SpringBootTest
@Transactional
class ClubCommandServiceTest {

  @Autowired ClubCommandService clubCommandService;
  @Autowired AuthService authService;
  @Autowired ClubRoleService clubRoleService;

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

  private RegisterRequest createRegisterRequest(String name, String email, String password) {
    return RegisterRequest.builder().name(name).email(email).password(password).build();
  }

  private ClubCreateRequest createClubCreateRequest(String clubName, String category) {
    return ClubCreateRequest.builder().name(clubName).category(category).build();
  }
}
