package com.ryc.api.v1.passer.service;

import java.util.List;

import com.ryc.api.v1.passer.dto.request.CreateFinalPasserRequest;
import com.ryc.api.v1.passer.dto.response.CreateFinalPasserResponse;
import com.ryc.api.v1.passer.dto.response.GetAllFinalPasserResponse;

public interface PasserService {
  List<CreateFinalPasserResponse> createFinalPasser(CreateFinalPasserRequest body);

  List<GetAllFinalPasserResponse> findAllFinalPasser(String RecruitmentId);
}
