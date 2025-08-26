package com.ryc.api.v2.admin.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record AdminEmailDuplicatedResponse(
    @Schema(description = "이메일이 중복되었는지 여부") boolean duplicated) {}
