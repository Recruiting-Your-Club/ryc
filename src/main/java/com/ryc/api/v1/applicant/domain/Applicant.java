package com.ryc.api.v1.applicant.domain;

import com.ryc.api.v1.applicant.dto.internal.ApplicantDto;
import com.ryc.api.v1.application.dto.internal.RequiredFieldDto;
import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.common.entity.BaseEntity;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Applicant extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "applicant_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruitment_id")
    private Recruitment recruitment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    private String name;
    private String imageUrl;
    private String thumbnailUrl;
    private String email;
    private String phone;
    private String studentId;

    @Builder.Default
    private boolean deleted = false;

    public void setRequiredFields(RequiredFieldDto requiredFieldDto) {
        this.name = requiredFieldDto.name();
        this.imageUrl = requiredFieldDto.image();
        this.email = requiredFieldDto.email();
        this.phone = requiredFieldDto.phone();
        this.studentId = requiredFieldDto.studentId();
    }

    public RequiredFieldDto toRequiredFieldDto() {
        return RequiredFieldDto.builder()
                .name(this.name)
                .email(this.email)
                .phone(this.phone)
                .studentId(this.studentId)
                .image(this.imageUrl)
                .build();
    }

    public ApplicantDto toApplicantDto() {
        return ApplicantDto.builder()
                .name(this.name)
                .email(this.email)
                .phone(this.phone)
                .studentId(this.studentId)
                .image(this.imageUrl)
                .build();
    }
}
