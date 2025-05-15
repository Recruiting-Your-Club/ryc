package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AnnouncementPeriodInfoMapper {

    private final PeriodMapper periodMapper;

    public AnnouncementPeriodInfo toDomain(AnnouncementPeriodInfoVO periodInfoVO) {
        
        return AnnouncementPeriodInfo.builder()
                .applicationPeriod(periodMapper.toEntity(periodInfoVO.getApplicationPeriodVO()))
                .interviewPeriod(periodMapper.toEntity(periodInfoVO.getInterviewPeriodVO()))
                .resultAnnouncementPeriod(periodMapper.toEntity(periodInfoVO.getResultAnnouncementPeriodVO()))
                .applicationResultPeriod(periodMapper.toEntity(periodInfoVO.getApplicationResultPeriodVO()))
                .build();
    }

    public AnnouncementPeriodInfoVO toVO(AnnouncementPeriodInfo periodInfo) {
        
        return AnnouncementPeriodInfoVO.builder()
                .applicationPeriodVO(periodMapper.toVO(periodInfo.getApplicationPeriod()))
                .interviewPeriodVO(periodMapper.toVO(periodInfo.getInterviewPeriod()))
                .resultAnnouncementPeriodVO(periodMapper.toVO(periodInfo.getResultAnnouncementPeriod()))
                .applicationResultPeriodVO(periodMapper.toVO(periodInfo.getApplicationResultPeriod()))
                .build();
    }
}