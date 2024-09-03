package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.evaluation.domain.Permission;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
    boolean existsByUserAndRecruitment(User user, Recruitment recruitment);
}
