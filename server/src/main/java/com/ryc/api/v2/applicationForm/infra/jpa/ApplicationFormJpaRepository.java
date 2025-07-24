package com.ryc.api.v2.applicationForm.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicationForm.infra.entity.ApplicationFormEntity;

@Repository
public interface ApplicationFormJpaRepository extends JpaRepository<ApplicationFormEntity, String> {

  Optional<ApplicationFormEntity> findByAnnouncementId(String announcementId);
}
