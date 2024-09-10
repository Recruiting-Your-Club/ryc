package com.ryc.api.v1.passer.service;

import com.ryc.api.v1.passer.dto.request.CreateFinalPasserRequest;
import com.ryc.api.v1.passer.dto.response.CreateFinalPasserResponse;

import java.util.List;

public interface PasserService {
    List<CreateFinalPasserResponse> createFinalPasser(CreateFinalPasserRequest body);
}
