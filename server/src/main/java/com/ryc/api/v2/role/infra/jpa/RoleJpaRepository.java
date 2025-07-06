package com.ryc.api.v2.role.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.auth.infra.entity.AdminEntity;
import com.ryc.api.v2.role.infra.entity.ClubRoleEntity;

public interface RoleJpaRepository extends JpaRepository<ClubRoleEntity, String> {

  @Query("SELECT r.admin FROM ClubRoleEntity r WHERE r.club.id = :clubId")
  List<AdminEntity> findAdminsByClubId(@Param("clubId") String clubId);

  @Query("SELECT r FROM ClubRoleEntity r WHERE r.club.id = :clubId")
  List<ClubRoleEntity> findByClubId(String clubId);

  @Query(
      "SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END "
          + "FROM ClubRoleEntity r WHERE r.admin.id = :adminId AND r.club.id = :clubId")
  boolean existsByAdminIdAndClubId(String adminId, String clubId);

  @Query(
      "SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END "
          + "FROM ClubRoleEntity r WHERE r.admin.id = :adminId AND r.club.id = :clubId AND r.role = 'OWNER'")
  boolean existsOwnerRoleByAdminIdAndClubId(String adminId, String clubId);

  void deleteByAdminId(String adminId);
}
