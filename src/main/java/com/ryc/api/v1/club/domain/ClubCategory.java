package com.ryc.api.v1.club.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ClubCategory {
    @EmbeddedId
    private ClubCategoryId id;

    @MapsId("clubId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @MapsId("categoryId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}