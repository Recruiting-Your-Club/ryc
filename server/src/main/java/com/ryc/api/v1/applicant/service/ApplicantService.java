package com.ryc.api.v1.applicant.service;

import com.ryc.api.v1.applicant.dto.response.GetAllApplicantResponse;

public interface ApplicantService {
    GetAllApplicantResponse getAllApplicantsByRecruitmentId(String recruitmentId);
}
