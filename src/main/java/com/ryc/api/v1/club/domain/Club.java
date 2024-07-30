package com.ryc.api.v1.club.domain;

import com.ryc.api.v1.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
public class Club extends BaseEntity {
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

    public Club() {
        super();
    }
}
