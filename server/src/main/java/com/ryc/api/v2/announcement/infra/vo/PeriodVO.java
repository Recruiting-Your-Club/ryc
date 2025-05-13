package com.ryc.api.v2.announcement.infra.vo;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.time.LocalDateTime;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class PeriodVO {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
