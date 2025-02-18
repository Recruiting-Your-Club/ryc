package com.ryc.api.v1.recruitment.service;

import com.ryc.api.v1.recruitment.dto.request.CreateRecruitmentRequest;
import com.ryc.api.v1.recruitment.dto.response.CreateRecruitmentResponse;

public interface RecruitmentService {
  CreateRecruitmentResponse createRecruitment(CreateRecruitmentRequest body);
}
