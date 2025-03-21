package com.ryc.api.v1.evaluation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.evaluation.domain.Permission;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.user.domain.User;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
  boolean existsByUserAndRecruitment(User user, Recruitment recruitment);

  List<Permission> findAllByRecruitmentId(String recruitmentId);
}
