package com.ryc.api.v2.file.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

public record AccessPresignedUrlGetRequest(
    @Schema(example = "e23d9b4f-5d5e-4a6b-9c6b-7b6b6b6b6b6b", description = "metadataId")
        @NotBlank(message = "파일 메타데이터 id는 빈값일 수 없습니다.")
        @UUID(message = "파일 메타데이터 아이디는 UUID 포멧을 준수해야 합니다.")
        String metadataId,
    @Schema(example = "e23d9b4f-5d5e-4a6b-9c6b-7b6b6b6b6b6b", description = "accessToken")
        @UUID(message = "accessToken은 UUID 포멧을 준수해야 합니다.")
        String accessToken) {}
