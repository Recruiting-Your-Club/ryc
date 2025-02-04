package com.ryc.api.v1.applicant.service;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.applicant.dto.internal.ApplicantDto;
import com.ryc.api.v1.applicant.dto.response.GetAllApplicantResponse;
import com.ryc.api.v1.applicant.repository.ApplicantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ApplicantServiceImpl implements ApplicantService{
    private final ApplicantRepository applicantRepository;

    @Override
    public GetAllApplicantResponse getAllApplicantsByRecruitmentId(String recruitmentId) {
        //1. 해당 전형에 소속된 지원자들 찾기
        List<Applicant> applicants = applicantRepository.findByRecruitmentId(recruitmentId);
        if (applicants.isEmpty())
            throw new NoSuchElementException("applicants not found");

        List<ApplicantDto> applicantDtos = new ArrayList<>();
        for (Applicant applicant : applicants) {
            applicantDtos.add(applicant.toApplicantDto());
        }

        return new GetAllApplicantResponse(applicantDtos);
    }
}
