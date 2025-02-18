package com.ryc.api.v1.evaluation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.domain.PermissionApplication;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.user.domain.User;

@Repository
public interface PermissionRequestRepository extends JpaRepository<PermissionApplication, String> {
  boolean existsByRecruitmentAndUser(Recruitment recruitment, User user);

  List<PermissionApplication> findByRecruitmentId(String recruitmentId);

  List<PermissionApplication> findByRecruitmentIdAndRequestStatus(
      String recruitmentId, RequestStatus requestStatus);
}
