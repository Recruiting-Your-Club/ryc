package com.ryc.api.v1.role.repository;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.role.domain.UserClubRole;
import com.ryc.api.v1.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserClubRoleRepository extends JpaRepository<UserClubRole, String> {
    Optional<UserClubRole> findByClubAndUser(Club club, User user);
}
