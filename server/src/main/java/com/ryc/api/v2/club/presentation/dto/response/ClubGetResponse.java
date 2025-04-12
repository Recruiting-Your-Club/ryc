package com.ryc.api.v2.club.presentation.dto.response;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.ClubTag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ClubGetResponse(
        @NotBlank String id,
        @NotBlank String name,
        @NotBlank String description,
        String imageUrl,
        String thumbnailUrl,
        @NotNull Category category,
        List<ClubTag> clubTags,
        @NotNull Boolean deleted,
        @NotNull LocalDateTime createdAt,
        @NotNull LocalDateTime updatedAt
) {
}
