package com.ryc.api.v2.admin.infra.entity;

import jakarta.persistence.*;

import org.hibernate.annotations.SQLDelete;

import com.ryc.api.v2.admin.domain.AdminDefaultRole;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "admins")
@SQLDelete(sql = "UPDATE admins SET is_deleted = true WHERE id = ?")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AdminEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String name;

  @Column(unique = true)
  private String email;

  private String password;

  @Column(columnDefinition = "TEXT")
  private String imageUrl;

  private String thumbnailUrl;

  @Enumerated(EnumType.STRING)
  private AdminDefaultRole adminDefaultRole;

  @Builder.Default private Boolean isDeleted = false;
}
