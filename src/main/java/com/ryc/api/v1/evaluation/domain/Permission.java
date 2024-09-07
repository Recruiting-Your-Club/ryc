package com.ryc.api.v1.evaluation.domain;

import com.ryc.api.v1.common.entity.BaseEntity;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationAuthorizedUserResponse;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "evaluation_permission",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "recruitment_id"})
        })
public class Permission extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "evaluation_permission_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruitment_id")
    private Recruitment recruitment;

    public GetEvaluationAuthorizedUserResponse toGetEvaluationAuthorizedUserResponse(String permissionId){
        return GetEvaluationAuthorizedUserResponse.builder()
                .permissionId(permissionId)
                .userId(this.user.getId())
                .username(this.user.getUsername())
                .build();
    }
}
