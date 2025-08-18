package com.ryc.api.v2.file.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UploadUrlRequest(
    @NotBlank String fileName, @NotNull String fileType, @NotBlank String contentType) {}
