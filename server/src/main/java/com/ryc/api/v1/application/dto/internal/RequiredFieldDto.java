package com.ryc.api.v1.application.dto.internal;

import lombok.Builder;

@Builder
public record RequiredFieldDto(
    String name, String email, String phone, String studentId, String image) {}
