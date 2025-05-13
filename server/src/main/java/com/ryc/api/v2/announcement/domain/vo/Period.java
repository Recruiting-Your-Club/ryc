package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class Period {
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;
}
