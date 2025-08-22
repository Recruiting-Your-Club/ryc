package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.common.domain.Period;
import com.ryc.api.v2.common.infra.mapper.PeriodMapper;
import com.ryc.api.v2.common.infra.vo.PeriodVO;

public class AnnouncementPeriodInfoMapper {

  /** VO to Domain */
  public static AnnouncementPeriodInfo toDomain(AnnouncementPeriodInfoVO periodInfoVO) {
    Period applicationPeriod = PeriodMapper.toDomain(periodInfoVO.getApplicationPeriodVO());
    Period interviewPeriod = PeriodMapper.toDomain(periodInfoVO.getInterviewPeriodVO());
    Period finalResultPeriod = PeriodMapper.toDomain(periodInfoVO.getFinalResultPeriodVO());
    Period documentResultPeriod = PeriodMapper.toDomain(periodInfoVO.getDocumentResultPeriodVO());

    return AnnouncementPeriodInfo.builder()
        .applicationPeriod(applicationPeriod)
        .interviewPeriod(interviewPeriod)
        .finalResultPeriod(finalResultPeriod)
        .documentResultPeriod(documentResultPeriod)
        .build();
  }

  /** Domain to VO */
  public static AnnouncementPeriodInfoVO toVO(AnnouncementPeriodInfo periodInfo) {
    PeriodVO applicationPeriodVO = PeriodMapper.toVO(periodInfo.applicationPeriod());
    PeriodVO interviewPeriodVO = PeriodMapper.toVO(periodInfo.interviewPeriod());
    PeriodVO finalResultPeriodVO = PeriodMapper.toVO(periodInfo.finalResultPeriod());
    PeriodVO documentResultPeriodVO = PeriodMapper.toVO(periodInfo.documentResultPeriod());

    return AnnouncementPeriodInfoVO.builder()
        .applicationPeriodVO(applicationPeriodVO)
        .interviewPeriodVO(interviewPeriodVO)
        .finalResultPeriodVO(finalResultPeriodVO)
        .documentResultPeriodVO(documentResultPeriodVO)
        .build();
  }
}
