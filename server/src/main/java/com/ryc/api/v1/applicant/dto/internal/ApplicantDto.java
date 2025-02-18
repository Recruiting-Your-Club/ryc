package com.ryc.api.v1.applicant.dto.internal;

import lombok.Builder;

@Builder
public record ApplicantDto(
    String name, String email, String phone, String studentId, String image) {}
