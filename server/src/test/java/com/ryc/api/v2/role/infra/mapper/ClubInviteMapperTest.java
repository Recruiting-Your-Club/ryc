package com.ryc.api.v2.role.infra.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.role.domain.ClubRole;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

class ClubInviteMapperTest {

  @Test
  @DisplayName("ClubRole 도메인을 엔티티로 변환하고 다시 도메인으로 변환하면, 필드 누락 없이 원래 값과 동일해야 한다.")
  void mappingRoundTripTest() {
    // given
    Club club = Club.initialize("테스트 동아리", "ACADEMIC");
    Admin admin =
        Admin.initialize(
            "홍길동",
            "test@example.com",
            "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy");

    ClubRole originalDomain =
        ClubRole.builder()
            .id(UUID.randomUUID().toString())
            .role(Role.MEMBER)
            .club(club)
            .admin(admin)
            .joinedAt(LocalDateTime.now())
            .build();

    // when
    ClubRoleEntity entity = ClubRoleMapper.toEntity(originalDomain);
    setId(entity, originalDomain.getId());
    setCreatedAt(entity, originalDomain.getJoinedAt());
    ClubRole resultDomain = ClubRoleMapper.toDomain(entity);

    // then
    assertThat(resultDomain).usingRecursiveComparison().isEqualTo(originalDomain);
  }

  // 테스트 헬퍼: Entity의 id를 설정 (실제 JPA에서는 자동 생성됨)
  void setId(ClubRoleEntity entity, String id) {
    try {
      Field field = entity.getClass().getDeclaredField("id");
      field.setAccessible(true);
      field.set(entity, id);
    } catch (Exception e) {
      throw new RuntimeException("Failed to set id", e);
    }
  }

  // 테스트 헬퍼: BaseEntity의 createdAt을 설정 (실제 JPA에서는 자동 설정됨)
  void setCreatedAt(ClubRoleEntity entity, LocalDateTime createdAt) {
    try {
      Field field = entity.getClass().getSuperclass().getDeclaredField("createdAt");
      field.setAccessible(true);
      field.set(entity, createdAt);
    } catch (Exception e) {
      throw new RuntimeException("Failed to set createdAt", e);
    }
  }
}
