package com.ryc.api.v1.role.repository;

import com.ryc.api.v1.role.domain.UserClubRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserClubRoleRepository extends JpaRepository<UserClubRole, String> {
}
