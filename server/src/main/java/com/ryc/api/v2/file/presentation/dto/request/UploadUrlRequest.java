package com.ryc.api.v2.file.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;

public record UploadUrlRequest(
    @NotBlank @Size(min = 1, max = 255, message = "파일 이름은 1자 이상, 255자 이하이어야 합니다.") String fileName,
    @Schema(
            description = "파일 타입",
            example = "CLUB_PROFILE",
            allowableValues = {
              "CLUB_PROFILE",
              "CLUB_IMAGE",
              "CLUB_POST_IMAGE",
              "ANNOUNCEMENT_IMAGE",
              "USER_PROFILE",
              "ANNOUNCEMENT_POST_IMAGE",
              "APPLICANT_PROFILE",
              "ANSWER_ATTACHMENT"
            })
        @NotBlank(message = "파일 타입은 빈값일 수 없습니다.")
        String fileType,
    @NotBlank(message = "파일 내용 타입(확장자)는 빈값일 수 없습니다.") String contentType) {}
