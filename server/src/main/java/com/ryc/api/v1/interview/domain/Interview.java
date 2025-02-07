package com.ryc.api.v1.interview.domain;

import com.ryc.api.v1.common.entity.BaseEntity;
import com.ryc.api.v1.recruitment.domain.Step;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Interview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "interview_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;

    @Column(name = "interview_date")
    private LocalDate date;

    @Column(name = "interview_time_number")
    private int timeNumber;
}
