package com.ryc.api.v2.role.infra;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

import java.util.NoSuchElementException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.role.domain.ClubInvite;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.domain.ClubRoleRepository;
import com.ryc.api.v2.role.domain.enums.Role;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class ClubRoleRepositoryImplTest {

  @Autowired ClubRoleRepository clubRoleRepository;

  @Autowired ClubRepository clubRepository;

  @Autowired AdminRepository adminRepository;

  @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;

  @Test
  @DisplayName("Club Role을 저장한다.")
  void save_givenNewClubRole_savesAndReturnsClubRole() {
    // given
    Club club = Club.initialize("test-club", "PERFORMANCE_ARTS");
    Admin admin = createAdmin();

    ClubRole clubRole = ClubRole.initialize(club, admin, Role.MEMBER);

    // when
    ClubRole saved = clubRoleRepository.save(clubRole);

    // then
    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getClub()).isEqualTo(club);
    assertThat(saved.getAdmin()).isEqualTo(admin);
    assertThat(saved.getRole()).isEqualTo(Role.MEMBER);
  }

  @Test
  @DisplayName("Club Invite를 저장한다.")
  void save_givenNewClubInvite_savesAndReturnsClubInvite() {
    // given
    Club club = Club.initialize("test-club", "PERFORMANCE_ARTS");
    Club savedClub = clubRepository.save(club);
    ClubInvite clubInvite = ClubInvite.initialize(savedClub);

    // when
    ClubInvite savedClubInvite = clubRoleRepository.saveInvite(clubInvite);

    // then
    assertThat(savedClubInvite.getId()).isNotNull();
    assertThat(savedClubInvite.getClub()).isEqualTo(savedClub);
  }

  @Test
  @DisplayName("ClubInvite를 Id로 조회한다.")
  void findInvite_givenId_returnClubInvite() {
    // given
    Club club = Club.initialize("test-club", "PERFORMANCE_ARTS");
    Club savedClub = clubRepository.save(club);
    ClubInvite clubInvite = ClubInvite.initialize(savedClub);
    ClubInvite savedClubInvite = clubRoleRepository.saveInvite(clubInvite);

    // when
    ClubInvite foundClubInvite = clubRoleRepository.findInviteById(savedClubInvite.getId());

    // then
    assertThat(foundClubInvite).isEqualTo(savedClubInvite);
  }

  @Test
  @DisplayName("CulbInvite를 존재하지 않는 Id로 조회시 NoSuchElementException 발생")
  void findInvite_givenInvalidId_throwException() {
    // given
    String nonExistId = "non-existent-id";

    // when && then
    assertThatThrownBy(() -> clubRoleRepository.findInviteById(nonExistId))
        .isInstanceOf(NoSuchElementException.class);
  }

  Admin createAdmin() {
    Admin admin = Admin.initialize("test", "test@test.com", bCryptPasswordEncoder.encode("123456"));
    Admin savedAdmin = adminRepository.save(admin);

    return adminRepository.save(savedAdmin);
  }
}
