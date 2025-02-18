package com.ryc.api.v1.club.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

import com.ryc.api.v1.club.domain.Club;

public record CreateClubRequest(
    @NotEmpty(message = "clubName shouldn't be empty") String name,
    @NotEmpty(message = "description shouldn't be empty") String description,
    List<String> categories) {

  public Club toClub() {
    return Club.builder().clubName(name).clubDescription(description).build();
  }
}
