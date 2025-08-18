package com.ryc.api.v2.applicationForm.infra;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.ApplicationFormRepository;
import com.ryc.api.v2.applicationForm.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.applicationForm.infra.jpa.ApplicationFormJpaRepository;
import com.ryc.api.v2.applicationForm.infra.mapper.ApplicationFormMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicationFormRepositoryImpl implements ApplicationFormRepository {
  private final ApplicationFormJpaRepository applicationFormJpaRepository;

  @Override
  public ApplicationForm findByAnnouncementId(String id) {
    ApplicationFormEntity applicationFormEntity =
        applicationFormJpaRepository
            .findByAnnouncementId(id)
            .orElseThrow(() -> new NoSuchElementException("announcementApplication not found"));

    return ApplicationFormMapper.toDomain(applicationFormEntity);
  }
}
