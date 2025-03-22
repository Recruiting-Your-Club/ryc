package com.ryc.api.v2.admin.infra.entity;

import com.ryc.api.v2.admin.domain.AdminDefaultRole;
import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admins")
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
    private String imageUrl;
    private String thumbnailUrl;

    @Enumerated(EnumType.STRING)
    private AdminDefaultRole adminDefaultRole;

    private Boolean deleted;
}
