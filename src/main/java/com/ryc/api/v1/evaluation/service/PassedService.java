package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.evaluation.dto.request.CreatePasserRequest;
import com.ryc.api.v1.evaluation.dto.response.CreatePasserResponse;

public interface PassedService {
    CreatePasserResponse createPasser(CreatePasserRequest body);
}
