package com.ryc.api.v2.role.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.club.infra.projection.MyClubProjection;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

public interface ClubRoleJpaRepository extends JpaRepository<ClubRoleEntity, String> {

  List<ClubRoleEntity> findByClub_Id(String clubId);

  boolean existsByAdmin_IdAndClub_Id(
      @Param("adminId") String adminId, @Param("clubId") String clubId);

  @Query(
      """
        SELECT CASE WHEN EXISTS (
          SELECT 1 FROM ClubRoleEntity r
          WHERE r.admin.id = :adminId AND r.club.id = :clubId AND r.role = 'OWNER'
        ) THEN true ELSE false END
      """)
  boolean existsOwnerRoleByAdmin_IdAndClub_Id(
      @Param("adminId") String adminId, @Param("clubId") String clubId);

  boolean existsByClub_Id(String clubId);

  boolean existsByAdmin_Id(String adminId);

  @Query("""
    SELECT COUNT(r)
    FROM ClubRoleEntity r
    WHERE r.club.id = :clubId
""")
  long countByClubId(@Param("clubId") String clubId);

  void deleteByAdmin_IdAndClub_Id(String adminId, String clubId);

  @Query(
      """
    SELECT r.club AS club, r.role AS role
    FROM ClubRoleEntity r
    WHERE r.admin.id = :adminId
  """)
  List<MyClubProjection> findClubsAndRolesByAdmin_Id(String adminId);

  void deleteByClub_Id(String clubId);

  void deleteAllByAdmin_Id(String adminId);
}
