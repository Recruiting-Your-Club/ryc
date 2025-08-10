package com.ryc.api.v2.file.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UploadConfirmRequest(@NotBlank String fileMetadataId) {}
