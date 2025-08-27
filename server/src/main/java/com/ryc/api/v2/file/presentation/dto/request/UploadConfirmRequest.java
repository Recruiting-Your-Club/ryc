package com.ryc.api.v2.file.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;

public record UploadConfirmRequest(
    @NotBlank(message = "파일 메타데이터 id는 빈값일 수 없습니다.")
        @UUID(message = "파일 메타데이터 아이디는 UUID 포멧을 준수해야 합니다.")
        String fileMetadataId) {}
