package com.ryc.api.v2.club.domain;

import com.ryc.api.v2.club.presentation.dto.request.CreateClubRequest;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

@Getter
@Builder
public class Club {
    private final String id;
    private final String name;
    private final String description;
    private final String imageUrl;
    private final String thumbnailUrl;
    private final Category category;
    private final List<ClubTag> clubTags;

    @Builder.Default
    private final Boolean deleted = Boolean.FALSE;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * Club 동아리 최초 생성시에만 사용 (id가 생성되기 전에만)
     */
    public static Club initialize(CreateClubRequest createClubRequest,
                                  final String imageUrl, final String thumbnailUrl,
                                  final List<ClubTag> clubTags) {
        return Club.builder()
                .id(DEFAULT_INITIAL_ID) //실제로 비즈니스 로직에서 사용되지 않음
                .name(createClubRequest.name())
                .description(createClubRequest.description())
                .imageUrl(imageUrl)
                .thumbnailUrl(thumbnailUrl)
                .category(createClubRequest.category())
                .clubTags(clubTags)
                .deleted(false)
                .build();
    }
}