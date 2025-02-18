package com.ryc.api.v1.recruitment.domain;

import java.time.LocalDate;

import jakarta.persistence.*;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.common.constant.ProcessStatus;
import com.ryc.api.v1.common.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Recruitment extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "recruitment_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private Club club;

  private String recruitmentName;

  @Enumerated(EnumType.STRING)
  @Builder.Default
  private ProcessStatus status = ProcessStatus.CREATED;

  private LocalDate expireDate;
  private Boolean deleted;

  protected Recruitment() {
    super();
  }
}
