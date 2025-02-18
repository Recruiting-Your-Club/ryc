package com.ryc.api.v1.evaluation.service;

import java.util.List;

import com.ryc.api.v1.evaluation.dto.request.CreatePasserRequest;
import com.ryc.api.v1.evaluation.dto.response.CreatePasserResponse;
import com.ryc.api.v1.evaluation.dto.response.GetPasserResponse;

public interface PassedService {
  CreatePasserResponse createPasser(CreatePasserRequest body);

  List<GetPasserResponse> getPasser(String stepId);
}
