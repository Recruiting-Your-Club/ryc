package com.ryc.api.v1.recruitment.dto.request;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateRecruitmentRequest(@NotEmpty(message = "clubId shouldn't be empty") String clubId,
                                       @NotEmpty(message = "clubId shouldn't be empty") String recruitmentName,
                                       @NotNull(message = "clubId shouldn't be empty") LocalDate expireDate) {
    public Recruitment toRecruitment(Club club) {
        return Recruitment.builder()
                .club(club)
                .recruitmentName(this.recruitmentName)
                .expireDate(this.expireDate)
                .build();
    }
}
