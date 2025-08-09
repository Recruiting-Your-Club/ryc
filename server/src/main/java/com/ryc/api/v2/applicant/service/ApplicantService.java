package com.ryc.api.v2.applicant.service;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantStatusRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicantService {

  private final ApplicantRepository applicantRepository;

  @Transactional
  public void changeApplicantStatus(String applicantId, ApplicantStatusRequest statusRequest) {
    Applicant applicant = applicantRepository.findById(applicantId);
    ApplicantStatus newStatus = ApplicantStatus.from(statusRequest.status());

    Applicant updatedApplicant = applicant.updateStatus(newStatus);
    applicantRepository.save(updatedApplicant);
  }
}
