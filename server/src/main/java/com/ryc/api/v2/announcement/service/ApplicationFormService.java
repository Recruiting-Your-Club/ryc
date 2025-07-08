package com.ryc.api.v2.announcement.service;

import org.springframework.stereotype.Service;

import com.ryc.api.v2.announcement.domain.ApplicationFormRepository;
import com.ryc.api.v2.announcement.presentation.dto.response.ApplicationFormResponse;

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
  public ApplicationFormResponse getApplicationFormByAnnouncementId(String announcementId) {
    return ApplicationFormResponse.from(
        applicationFormRepository.findByAnnouncementId(announcementId));
  }

}
