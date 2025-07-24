package com.ryc.api.v2.application.infra.jpa;

import com.ryc.api.v2.application.infra.entity.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationJpaRepository extends JpaRepository<ApplicationEntity, String> {
    Optional<ApplicationEntity> findByApplicantId(String applicantId);
}
