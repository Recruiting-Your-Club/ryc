package com.ryc.api.v1.evaluation.domain;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.common.entity.BaseEntity;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationResponse;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"step_id", "applicant_id", "reviewedBy"})
})
public class Evaluation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "evaluation_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruitment_id")
    private Recruitment recruitment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private Applicant applicant;

    /**
     * 0과 10사이의 최대 소수점 한자리의 실수
     */
    @Column(precision = 3, scale = 1)
    private BigDecimal score;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewedBy")
    private User reviewedBy;

    @Builder.Default
    private boolean deleted = false;

    public GetEvaluationResponse toGetEvaluationResponse() {
        GetEvaluationResponse.ApplicantDto applicantInfo = GetEvaluationResponse.ApplicantDto.builder()
                .applicantId(this.applicant.getId())
                .applicantName(this.applicant.getName())
                .build();

        GetEvaluationResponse.EvaluatorDto evaluatorInfo = GetEvaluationResponse.EvaluatorDto.builder()
                .evaluatorUserId(this.reviewedBy.getId())
                .evaluatorUserName(this.reviewedBy.getUsername())
                .build();

        GetEvaluationResponse.EvaluationDto evaluationInfo = GetEvaluationResponse.EvaluationDto.builder()
                .score(this.score)
                .comment(this.comment)
                .build();

        return GetEvaluationResponse.builder()
                .applicantInfo(applicantInfo)
                .evaluatorInfo(evaluatorInfo)
                .evaluationInfo(evaluationInfo)
                .build();
    }
}
