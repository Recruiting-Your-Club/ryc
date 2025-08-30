package com.ryc.api.v2.applicationForm.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.applicationForm.domain.ApplicationFormRepository;
import com.ryc.api.v2.applicationForm.presentation.response.ApplicationFormResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ApplicationFormService {

  private final ApplicationFormRepository applicationFormRepository;

  /**
   * 공고 ID로 공고 지원서 조회
   *
   * @param announcementId 공고 ID
   */
  @Transactional(readOnly = true)
  public ApplicationFormResponse getApplicationFormByAnnouncementId(String announcementId) {
    return ApplicationFormResponse.from(
        applicationFormRepository.findByAnnouncementId(announcementId));
  }
}
