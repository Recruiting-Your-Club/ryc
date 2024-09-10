package com.ryc.api.v1.recruitment.dto.request;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.recruitment.domain.StepType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public record CreateRecruitmentRequest(@NotEmpty(message = "clubId shouldn't be empty") String clubId,
                                       @NotEmpty(message = "clubId shouldn't be empty") String recruitmentName,
                                       @NotNull(message = "clubId shouldn't be empty") LocalDate expireDate,
                                       @NotEmpty List<RecruitmentStepDto> steps) {

    public record RecruitmentStepDto(
            @NotEmpty String stepName,
            @NotNull StepType stepType
    ) {
    }

    public Recruitment toRecruitment(Club club) {
        return Recruitment.builder()
                .club(club)
                .recruitmentName(this.recruitmentName)
                .expireDate(this.expireDate)
                .build();
    }

    public List<Step> toStepList(Recruitment recruitment) {
        List<Step> steps = new ArrayList<>();
        for (RecruitmentStepDto stepDto : this.steps) {
            Step step = Step.builder()
                    .recruitment(recruitment)
                    .stepType(stepDto.stepType())
                    .stepName(stepDto.stepName())
                    .build();
            steps.add(step);
        }
        return steps;
    }
}
