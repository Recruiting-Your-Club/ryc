package com.ryc.api.v1.club.domain;

import com.ryc.api.v1.club.dto.response.ClubResponse;
import com.ryc.api.v1.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Club extends BaseEntity {

    public Club() {
        super();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "club_id")
    private String id;

    @Column(unique = true)
    private String clubName;

    private String clubImageUrl;
    private String clubThumbnailImageUrl;
    private String clubDescription;
    private String clubPresidentId;
    private Boolean deleted;

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClubCategory> clubCategories = new ArrayList<>();

    public ClubResponse toClubResponse(List<String> categories) {
        return ClubResponse.builder()
                .clubName(this.clubName)
                .clubImageUrl(this.clubImageUrl)
                .clubDescription(this.clubDescription)
                .categories(categories)
                .build();
    }
}
