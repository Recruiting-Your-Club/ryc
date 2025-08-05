package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.announcement.infra.vo.PeriodVO;

public class PeriodMapper {

  /** PeriodVO to Domain */
  public static Period toDomain(PeriodVO periodVO) {
    if (periodVO == null) return null;

    return Period.builder()
        .startDate(periodVO.getStartDate())
        .endDate(periodVO.getEndDate())
        .build();
  }

  /** Domain to PeriodVO */
  public static PeriodVO toVO(Period period) {
    if (period == null) return null;

    return PeriodVO.builder().startDate(period.startDate()).endDate(period.endDate()).build();
  }
}
