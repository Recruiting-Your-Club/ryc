package com.ryc.api.v2.Interview.infra.mapper;

import com.ryc.api.v2.Interview.domain.InterviewSlot;
import com.ryc.api.v2.Interview.infra.entity.InterviewSlotEntity;
import com.ryc.api.v2.announcement.domain.vo.Period;
import com.ryc.api.v2.announcement.infra.mapper.PeriodMapper;
import com.ryc.api.v2.announcement.infra.vo.PeriodVO;

public class InterviewSlotMapper {

  private InterviewSlotMapper() {
    // Private constructor to prevent instantiation
  }

  public static InterviewSlot toDomain(InterviewSlotEntity interviewSlotEntity) {
    Period period = PeriodMapper.toDomain(interviewSlotEntity.getPeriod());
    return InterviewSlot.builder()
        .id(interviewSlotEntity.getId())
        .creatorId(interviewSlotEntity.getCreatorId())
        .announcementId(interviewSlotEntity.getAnnouncementId())
        .maxNumberOfPeople(interviewSlotEntity.getMaxNumberOfPeople())
        .period(period)
        .build();
  }

  public static InterviewSlotEntity toEntity(InterviewSlot interviewSlot) {
    PeriodVO periodVO = PeriodMapper.toVO(interviewSlot.getPeriod());
    return InterviewSlotEntity.builder()
        .id(interviewSlot.getId())
        .creatorId(interviewSlot.getCreatorId())
        .announcementId(interviewSlot.getAnnouncementId())
        .maxNumberOfPeople(interviewSlot.getMaxNumberOfPeople())
        .period(periodVO)
        .build();
  }
}
