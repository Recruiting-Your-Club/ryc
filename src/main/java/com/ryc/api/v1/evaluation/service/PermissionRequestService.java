package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.evaluation.dto.request.PermissionRequest;
import com.ryc.api.v1.evaluation.dto.response.PermissionResponse;

public interface PermissionRequestService {
    PermissionResponse requestPermission(PermissionRequest body);
}
