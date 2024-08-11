package com.ryc.api.v1.club.dto;

import com.ryc.api.v1.club.domain.Club;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateClubRequestDto(@NotEmpty(message = "clubName shouldn't be empty") String name,
                                   @NotEmpty(message = "description shouldn't be empty") String description,
                                   List<String> categories) {

    public Club toClub() {
        return Club.builder()
                .clubName(name)
                .clubDescription(description)
                .build();
    }

}
