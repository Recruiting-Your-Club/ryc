package com.ryc.api.v1.club.domain;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class ClubCategoryId implements Serializable {
  private String clubId;
  private String categoryId;
}
