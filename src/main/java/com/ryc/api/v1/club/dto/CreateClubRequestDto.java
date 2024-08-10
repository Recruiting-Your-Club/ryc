package com.ryc.api.v1.club.dto;

import com.ryc.api.v1.club.domain.Club;
import jakarta.validation.constraints.NotEmpty;

public record CreateClubRequestDto(@NotEmpty(message = "clubName shouldn't be empty") String name,
                                   @NotEmpty(message = "description shouldn't be empty") String description,
                                   String category) {

    public Club toClub() {
        return Club.builder()
                .clubName(name)
                .clubDescription(description)
                .build();
    }

}
