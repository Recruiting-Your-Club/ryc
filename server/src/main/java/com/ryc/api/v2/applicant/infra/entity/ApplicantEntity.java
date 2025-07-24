package com.ryc.api.v2.applicant.infra.entity;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applicants")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicantEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, name = "announcement_id")
    private String announcementId;

    private String email;
    private String name;

    @Enumerated(EnumType.STRING)
    private ApplicantStatus status;

    private Boolean isDeleted;
}
