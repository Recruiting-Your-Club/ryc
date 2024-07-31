package com.ryc.api.v1.club.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ClubCategoryId implements Serializable {
    private String clubId;
    private String categoryId;
}
