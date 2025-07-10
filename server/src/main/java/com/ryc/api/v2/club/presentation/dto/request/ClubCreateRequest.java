package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import com.ryc.api.v2.club.domain.enums.Category;

import lombok.Builder;

@Builder
public record ClubCreateRequest(
    @NotBlank(message = "동아리 이름은 비워둘 수 없습니다.") String name,
    @NotBlank(message = "동아리 카테고리는 비워둘 수 없습니다.") Category category,
    String imageUrl,
    String thumbnailUrl) {}
