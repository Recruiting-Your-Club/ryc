package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.dto.request.PermissionRequest;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.PermissionResponse;

import java.util.List;

public interface PermissionRequestService {
    PermissionResponse requestPermission(PermissionRequest body);
    List<GetPermissionApplicationResponse>  findPermissionApplications(String recruitmentId, RequestStatus status);
}

