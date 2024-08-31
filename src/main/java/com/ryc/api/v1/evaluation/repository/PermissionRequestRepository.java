package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.evaluation.domain.PermissionApplication;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRequestRepository extends JpaRepository<PermissionApplication, String> {
    boolean existsByRecruitmentAndUser(Recruitment recruitment, User user);
}