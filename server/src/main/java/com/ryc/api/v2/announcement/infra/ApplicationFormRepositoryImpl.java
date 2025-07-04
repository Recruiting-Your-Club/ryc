package com.ryc.api.v2.announcement.infra;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.ApplicationForm;
import com.ryc.api.v2.announcement.domain.ApplicationFormRepository;
import com.ryc.api.v2.announcement.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.announcement.infra.jpa.ApplicationFormJpaRepository;
import com.ryc.api.v2.announcement.infra.mapper.ApplicationFormMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicationFormRepositoryImpl implements ApplicationFormRepository {
  private final ApplicationFormJpaRepository applicationFormJpaRepository;
  private final ApplicationFormMapper applicationFormMapper;

  @Override
  public ApplicationForm findByAnnouncementId(String id) {
    ApplicationFormEntity applicationFormEntity =
        applicationFormJpaRepository
            .findByAnnouncementId(id)
            .orElseThrow(() -> new EntityNotFoundException("announcementApplication not found"));

    return applicationFormMapper.toDomain(applicationFormEntity);
  }
}
