package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;
import lombok.Builder;

import java.time.LocalDateTime;

/**
 *
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 * @brief 기간 정보 pojo
 */
@Builder
public record Period (
        LocalDateTime startDate,
        LocalDateTime endDate
) {
    public static Period initialize(PeriodRequest periodRequest) {

        return Period.builder()
                .startDate(periodRequest.startDate())
                .endDate(periodRequest.endDate())
                .build();
    }

    /**
     *
     * @param period
     * @return 둘의 기간이 겹치는지 여부
     */
    public Boolean isOverlapped(Period period) {
        return !(endDate.isBefore(period.startDate) || startDate.isAfter(period.endDate));
    }

    /**
     *
     * @return 기간이 정상적인지 여부
     */
    public Boolean isValid() {
        if(startDate.isBefore(endDate)) {
            throw new IllegalArgumentException("startDate should be before endDate");
        }
        return true;
    }

    /**
     * @return 이미 지난 기간인지 여부
     */
    public Boolean isExpired() {
        return endDate.isBefore(LocalDateTime.now());
    }

    /**
     *
     * @param period
     * @return boolean
     * @brief period의 시작날짜이 이전인지 여부
     */
    public Boolean isBefore(Period period) {
        return endDate.isBefore(period.startDate);
    }
}
