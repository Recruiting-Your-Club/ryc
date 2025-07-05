package com.ryc.api.v2.announcement.infra.vo;

import java.time.LocalDateTime;

import jakarta.persistence.Embeddable;

import lombok.*;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class PeriodVO {
  private LocalDateTime startDate;
  private LocalDateTime endDate;
}
