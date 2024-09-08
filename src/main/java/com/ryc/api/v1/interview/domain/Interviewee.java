package com.ryc.api.v1.interview.domain;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"interview_id", "applicant_id"})
})
public class Interviewee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "interviewee_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id")
    private Interview interview;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private Applicant applicant;
}
