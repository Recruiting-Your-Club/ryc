package com.ryc.api.v1.passer.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.applicant.repository.ApplicantRepository;
import com.ryc.api.v1.passer.dto.request.CreateFinalPasserRequest;
import com.ryc.api.v1.passer.dto.response.CreateFinalPasserResponse;
import com.ryc.api.v1.passer.dto.response.GetAllFinalPasserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasserServiceImpl implements PasserService {
  private final ApplicantRepository applicantRepository;

  @Override
  @Transactional
  public List<CreateFinalPasserResponse> createFinalPasser(CreateFinalPasserRequest body) {
    List<CreateFinalPasserResponse> responses = new ArrayList<>();

    List<Applicant> applicants = applicantRepository.findAllByIdIn(body.applicantIdList());
    if (applicants.isEmpty()) throw new NoSuchElementException("applicants not found");

    for (Applicant applicant : applicants) {
      applicant.updateIsFinalPassed();

      CreateFinalPasserResponse response =
          CreateFinalPasserResponse.builder()
              .applicantId(applicant.getId())
              .applicantDtos(applicant.toNameOnlyRequiredFieldDto())
              .build();

      responses.add(response);
    }

    return responses;
  }

  @Override
  @Transactional
  public List<GetAllFinalPasserResponse> findAllFinalPasser(String RecruitmentId) {
    List<GetAllFinalPasserResponse> responses = new ArrayList<>();
    List<Applicant> applicants =
        applicantRepository.findByRecruitmentIdAndIsFinalPassedTrue(RecruitmentId);
    if (applicants.isEmpty()) throw new NoSuchElementException("applicants not found");

    for (Applicant applicant : applicants) {
      GetAllFinalPasserResponse response =
          GetAllFinalPasserResponse.builder()
              .applicantId(applicant.getId())
              .applicantDtos(applicant.toNameOnlyRequiredFieldDto())
              .build();

      responses.add(response);
    }

    return responses;
  }
}
