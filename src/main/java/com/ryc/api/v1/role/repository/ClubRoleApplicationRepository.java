package com.ryc.api.v1.role.repository;

import com.ryc.api.v1.role.domain.ClubRoleApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRoleApplicationRepository extends JpaRepository<ClubRoleApplication, String> {
}
