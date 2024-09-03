package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.evaluation.domain.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
}
