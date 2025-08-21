package com.ryc.api.v2.admin.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.projection.AdminIdNameProjection;

public interface AdminJpaRepository extends JpaRepository<AdminEntity, String> {

  @Query(
      "SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM AdminEntity a WHERE a.email = ?1 AND a.isDeleted = false")
  boolean existsByEmail(String email);

  @Query("SELECT a FROM AdminEntity a WHERE a.email = ?1 AND a.isDeleted = false")
  Optional<AdminEntity> findByEmail(String email);

  @Query(
      """
                SELECT e.id AS id, e.name AS name
                FROM AdminEntity e
                WHERE e.id IN :adminIds AND e.isDeleted = false
            """)
  List<AdminIdNameProjection> findIdAndNameByIds(@Param("adminIds") List<String> adminIds);
}
