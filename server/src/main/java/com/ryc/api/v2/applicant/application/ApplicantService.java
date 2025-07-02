package com.ryc.api.v2.applicant.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicantService {

  @Transactional
  public void validateApplicantEmail(String announcementId, List<String> emails) {}
}
