package com.ryc.api.v1.club.domain;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class ClubCategoryId implements Serializable {
    private String clubId;
    private String categoryId;
}
