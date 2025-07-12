package com.ryc.api.v2.role.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

public interface ClubRoleJpaRepository extends JpaRepository<ClubRoleEntity, String> {

  List<ClubRoleEntity> findByClubId(String clubId);

  @Query(
      """
            SELECT CASE WHEN EXISTS (
              SELECT 1 FROM ClubRoleEntity r
              WHERE r.admin.id = :adminId AND r.club.id = :clubId
            ) THEN true ELSE false END
          """)
  boolean existsByAdminIdAndClubId(
      @Param("adminId") String adminId, @Param("clubId") String clubId);

  @Query(
      """
        SELECT CASE WHEN EXISTS (
          SELECT 1 FROM ClubRoleEntity r
          WHERE r.admin.id = :adminId AND r.club.id = :clubId AND r.role = 'OWNER'
        ) THEN true ELSE false END
      """)
  boolean existsOwnerRoleByAdminIdAndClubId(
      @Param("adminId") String adminId, @Param("clubId") String clubId);

  void deleteByAdminId(String adminId);

  @Query(
      """
        SELECT c FROM ClubRoleEntity r
        JOIN r.club c
        WHERE r.admin.id = :adminId
      """)
  List<ClubEntity> findClubsByAdminId(String adminId);
}
