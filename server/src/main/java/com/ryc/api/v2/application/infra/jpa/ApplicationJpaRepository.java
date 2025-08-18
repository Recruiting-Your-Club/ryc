package com.ryc.api.v2.application.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.application.infra.entity.ApplicationEntity;

@Repository
public interface ApplicationJpaRepository extends JpaRepository<ApplicationEntity, String> {
  Optional<ApplicationEntity> findByApplicantId(String applicantId);

  @Query(
      "SELECT a.applicantId, a.createdAt FROM ApplicationEntity a WHERE a.applicantId IN :applicantIds")
  List<Object[]> findCreatedAtByApplicantIds(List<String> applicantIds);
}
