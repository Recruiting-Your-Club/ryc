package com.ryc.api.v2.auth.infra.entity;

import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "refreshTokens",
        // 사용자당 1개의 RT만 저장
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "admin_id")
        }
)
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RefreshTokenEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "admin_id")
    private AdminEntity adminEntity;

    private String token;

    private LocalDateTime expirationTime;
}
