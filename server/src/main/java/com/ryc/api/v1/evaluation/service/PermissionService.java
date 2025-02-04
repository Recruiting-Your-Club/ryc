package com.ryc.api.v1.evaluation.service;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.dto.request.CreatePermissionApplicationRequest;
import com.ryc.api.v1.evaluation.dto.request.UpdatePermissionStatusRequest;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationAuthorizedUserResponse;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.CreatePermissionApplicationResponse;
import com.ryc.api.v1.evaluation.dto.response.UpdatePermissionStatusResponse;

import java.util.List;

public interface PermissionService {
    CreatePermissionApplicationResponse requestPermission(CreatePermissionApplicationRequest body);

    List<GetPermissionApplicationResponse> findPermissionApplications(String recruitmentId, RequestStatus status);

    UpdatePermissionStatusResponse updatePermissionApplicationStatus(UpdatePermissionStatusRequest body);

    List<GetEvaluationAuthorizedUserResponse> findEvaluationAuthorizedUsers(String recruitmentId);
}

