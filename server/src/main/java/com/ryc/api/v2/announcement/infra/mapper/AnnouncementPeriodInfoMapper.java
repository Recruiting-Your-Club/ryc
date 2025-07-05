package com.ryc.api.v2.announcement.infra.mapper;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.PeriodVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementPeriodInfoMapper {
  private final PeriodMapper periodMapper;

  /** VO to Domain */
  AnnouncementPeriodInfo toDomain(AnnouncementPeriodInfoVO periodInfoVO) {
    Period applicationPeriod = periodMapper.toDomain(periodInfoVO.getApplicationPeriodVO());
    Period interviewPeriod = periodMapper.toDomain(periodInfoVO.getInterviewPeriodVO());
    Period finalResultPeriod = periodMapper.toDomain(periodInfoVO.getFinalResultPeriodVO());
    Period documentResultPeriod = periodMapper.toDomain(periodInfoVO.getDocumentResultPeriodVO());

    return AnnouncementPeriodInfo.builder()
        .applicationPeriod(applicationPeriod)
        .interviewPeriod(interviewPeriod)
        .finalResultPeriod(finalResultPeriod)
        .documentResultPeriod(documentResultPeriod)
        .build();
  }

  /** Domain to VO */
  AnnouncementPeriodInfoVO toVO(AnnouncementPeriodInfo periodInfo) {
    PeriodVO applicationPeriodVO = periodMapper.toVO(periodInfo.applicationPeriod());
    PeriodVO interviewPeriodVO = periodMapper.toVO(periodInfo.interviewPeriod());
    PeriodVO finalResultPeriodVO = periodMapper.toVO(periodInfo.finalResultPeriod());
    PeriodVO documentResultPeriodVO = periodMapper.toVO(periodInfo.documentResultPeriod());

    return AnnouncementPeriodInfoVO.builder()
        .applicationPeriodVO(applicationPeriodVO)
        .interviewPeriodVO(interviewPeriodVO)
        .finalResultPeriodVO(finalResultPeriodVO)
        .documentResultPeriodVO(documentResultPeriodVO)
        .build();
  }
}
