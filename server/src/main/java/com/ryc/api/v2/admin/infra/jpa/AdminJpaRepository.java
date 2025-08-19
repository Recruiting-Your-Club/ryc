package com.ryc.api.v2.admin.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.projection.AdminIdNameProjection;

public interface AdminJpaRepository extends JpaRepository<AdminEntity, String> {
  boolean existsByEmail(String email);

  Optional<AdminEntity> findByEmail(String email);

  @Query(
      """
                SELECT e.id AS id, e.name AS name
                FROM AdminEntity e
                WHERE e.id IN :adminIds
            """)
  List<AdminIdNameProjection> findIdAndNameByIds(@Param("adminIds") List<String> adminIds);
}
