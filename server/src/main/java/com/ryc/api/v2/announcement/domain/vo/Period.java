package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@Getter
public class Period {
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;

    @Override
    public int hashCode() {
        return Objects.hash(startDate, endDate);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Period period = (Period) obj;
        return Objects.equals(startDate, period.startDate) &&
               Objects.equals(endDate, period.endDate);
    }
}
