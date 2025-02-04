package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.domain.PermissionApplication;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRequestRepository extends JpaRepository<PermissionApplication, String> {
    boolean existsByRecruitmentAndUser(Recruitment recruitment, User user);

    List<PermissionApplication> findByRecruitmentId(String recruitmentId);

    List<PermissionApplication> findByRecruitmentIdAndRequestStatus(String recruitmentId, RequestStatus requestStatus);
}