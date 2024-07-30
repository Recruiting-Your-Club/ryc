package com.ryc.api.v1.club.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@IdClass(ClubCategoryKey.class)
public class ClubCategory {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}