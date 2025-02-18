package com.ryc.api.v1.role.domain;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.common.constant.RequestStatus;
import com.ryc.api.v1.role.dto.internal.UpdateStatusInformation;
import com.ryc.api.v1.role.dto.response.GetClubRoleApplicationResponse;
import com.ryc.api.v1.user.domain.User;

import lombok.*;

@Entity
@Getter
@Builder
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "club_id"})})
public class ClubRoleApplication {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "club_role_application_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private Club club;

  @Enumerated(EnumType.STRING)
  private ClubRole requestedRole;

  @Enumerated(EnumType.STRING)
  private RequestStatus requestStatus;

  private String reviewedBy;

  @CreationTimestamp private LocalDateTime requestAt = LocalDateTime.now();

  @UpdateTimestamp private LocalDateTime reviewedAt = LocalDateTime.now();
  ;

  public GetClubRoleApplicationResponse toGetClubRoleApplicationResponse(String username) {
    return GetClubRoleApplicationResponse.builder()
        .clubRoleApplicationId(this.id)
        .username(username)
        .requestAt(this.requestAt)
        .build();
  }

  public void updateRequestStatus(UpdateStatusInformation updateStatusInformation) {
    this.requestStatus = updateStatusInformation.requestStatus();
    this.reviewedBy = updateStatusInformation.reviewedBy();
    this.reviewedAt = LocalDateTime.now(); // dto로 넘기지 않고, 해당 메소드가 실행될 때 주입
  }
}
