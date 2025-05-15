package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.announcement.infra.vo.PeriodVO;
import org.springframework.stereotype.Component;

@Component
public class PeriodMapper {

    public Period toEntity(PeriodVO periodVO) {

        return Period.builder()
                .startDate(periodVO.getStartDate())
                .endDate(periodVO.getEndDate())
                .build();
    }

    public PeriodVO toVO(Period period) {

        return PeriodVO.builder()
                .startDate(period.getStartDate())
                .endDate(period.getEndDate())
                .build();
    }
}