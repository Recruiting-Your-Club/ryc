package com.ryc.api.v1.evaluation.domain;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.evaluation.dto.response.GetPermissionApplicationResponse;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.role.dto.internal.UpdateStatusInformation;
import com.ryc.api.v1.user.domain.User;

import lombok.*;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(
    name = "evaluation_permission_application",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "recruitment_id"})})
public class PermissionApplication {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "evaluation_permission_application_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recruitment_id")
  private Recruitment recruitment;

  @Enumerated(EnumType.STRING)
  private RequestStatus requestStatus;

  private String reviewedBy;

  @CreationTimestamp private LocalDateTime requestAt;

  @UpdateTimestamp private LocalDateTime reviewedAt;

  public GetPermissionApplicationResponse toGetPermissionApplicationResponse() {
    return GetPermissionApplicationResponse.builder()
        .permissionApplicationId(this.id)
        .username(this.user.getUsername())
        .requestStatus(this.requestStatus)
        .requestAt(this.requestAt)
        .build();
  }

  public void updateRequestStatus(UpdateStatusInformation updateStatusInformation) {
    this.requestStatus = updateStatusInformation.requestStatus();
    this.reviewedBy = updateStatusInformation.reviewedBy();
    this.reviewedAt = LocalDateTime.now();
  }
}
