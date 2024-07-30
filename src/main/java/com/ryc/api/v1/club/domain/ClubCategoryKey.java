package com.ryc.api.v1.club.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
public class ClubCategoryKey implements Serializable {
    private String clubId;
    private String categoryId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClubCategoryKey that = (ClubCategoryKey) o;
        return Objects.equals(clubId, that.clubId) && Objects.equals(categoryId, that.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clubId, categoryId);
    }

}
