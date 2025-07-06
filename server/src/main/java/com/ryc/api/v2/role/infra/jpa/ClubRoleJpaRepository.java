package com.ryc.api.v2.role.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

public interface ClubRoleJpaRepository extends JpaRepository<ClubRoleEntity, String> {

  @Query("SELECT r FROM ClubRoleEntity r WHERE r.club.id = :clubId")
  List<ClubRoleEntity> findByClubId(@Param("clubId") String clubId);

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
      "SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END "
          + "FROM ClubRoleEntity r WHERE r.admin.id = :adminId AND r.club.id = :clubId AND r.role = 'OWNER'")
  boolean existsOwnerRoleByAdminIdAndClubId(
      @Param("adminId") String adminId, @Param("clubId") String clubId);

  void deleteByAdminId(String adminId);
}
