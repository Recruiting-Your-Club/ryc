package com.ryc.api.v2.role.infra.jpa;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.AdminDefaultRole;
import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.projection.MyClubProjection;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class ClubRoleJpaRepositoryTest {

  @Autowired ClubRoleJpaRepository clubRoleJpaRepository;

  @Autowired ClubJpaRepository clubRepository;

  @Autowired AdminJpaRepository adminRepository;

  @Test
  @DisplayName("Owner role이 존재하는지 확인한다.")
  void existsOwnerRoleByAdmin_IdAndClub_Id_success() {
    // given
    ClubEntity club = createClub("test-club");
    ClubEntity savedClub = clubRepository.save(club);

    AdminEntity admin = createAdmin("test-admin", "test@test.com");
    AdminEntity savedAdmin = adminRepository.save(admin);

    ClubRoleEntity clubRole = createClubRole(savedClub, savedAdmin, Role.OWNER);
    clubRoleJpaRepository.save(clubRole);

    // when
    boolean result =
        clubRoleJpaRepository.existsOwnerRoleByAdmin_IdAndClub_Id(
            savedAdmin.getId(), savedClub.getId());

    // then
    assertThat(result).isTrue();
  }

  @Test
  @DisplayName("Member role을 가지고 있는 상태에서 Owner role이 존재하는지 확인한다.")
  void existsOwnerRoleByAdmin_IdAndClub_Id_returnsFalse() {
    // given
    ClubEntity club = createClub("test-club");
    ClubEntity savedClub = clubRepository.save(club);

    AdminEntity admin = createAdmin("test-admin", "test@test.com");
    AdminEntity savedAdmin = adminRepository.save(admin);

    ClubRoleEntity clubRole = createClubRole(savedClub, savedAdmin, Role.MEMBER);
    clubRoleJpaRepository.save(clubRole);

    // when
    boolean result =
        clubRoleJpaRepository.existsOwnerRoleByAdmin_IdAndClub_Id(
            savedAdmin.getId(), savedClub.getId());

    // then
    assertThat(result).isFalse();
  }

  @Test
  @DisplayName("club에 속한 권한의 개수를 센다.")
  void countByClubId_returns1() {
    // given
    ClubEntity club = createClub("test-club");
    ClubEntity savedClub = clubRepository.save(club);

    AdminEntity admin = createAdmin("test-admin", "test@test.com");
    AdminEntity savedAdmin = adminRepository.save(admin);

    ClubRoleEntity clubRole = createClubRole(savedClub, savedAdmin, Role.MEMBER);
    clubRoleJpaRepository.save(clubRole);

    // when
    long count = clubRoleJpaRepository.countByClubId(savedClub.getId());

    // then
    assertThat(count).isEqualTo(1);
  }

  @Test
  @DisplayName("List MyClubProjection를 AdminId로 조회한다.")
  void findClubsAndRolesByAdminId_returnsMyClubProjection() {
    // given
    AdminEntity admin = createAdmin("test-admin", "test@test.com");
    AdminEntity savedAdmin = adminRepository.save(admin);

    ClubEntity club1 = createClub("test-club1");
    ClubEntity club2 = createClub("test-club2");
    ClubEntity savedClub1 = clubRepository.save(club1);
    ClubEntity savedClub2 = clubRepository.save(club2);

    ClubRoleEntity clubRole1 = createClubRole(savedClub1, savedAdmin, Role.OWNER);
    ClubRoleEntity clubRole2 = createClubRole(savedClub2, savedAdmin, Role.MEMBER);
    clubRoleJpaRepository.save(clubRole1);
    clubRoleJpaRepository.save(clubRole2);

    // when
    List<MyClubProjection> results =
        clubRoleJpaRepository.findClubsAndRolesByAdmin_Id(savedAdmin.getId());

    // then
    assertThat(results).hasSize(2);
    assertThat(results)
        .anyMatch(
            projection ->
                (projection.getClub().equals(savedClub1) && projection.getRole() == Role.OWNER)
                    || (projection.getClub().equals(savedClub2)
                        && projection.getRole() == Role.MEMBER));
  }

  ClubRoleEntity createClubRole(ClubEntity club, AdminEntity admin, Role role) {
    return ClubRoleEntity.builder().role(role).club(club).admin(admin).build();
  }

  ClubEntity createClub(String name) {
    return ClubEntity.builder().name(name).category(Category.ACADEMIC).build();
  }

  AdminEntity createAdmin(String name, String email) {
    return AdminEntity.builder()
        .name(name)
        .email(email)
        .password(new BCryptPasswordEncoder().encode(""))
        .adminDefaultRole(AdminDefaultRole.USER)
        .build();
  }
}
