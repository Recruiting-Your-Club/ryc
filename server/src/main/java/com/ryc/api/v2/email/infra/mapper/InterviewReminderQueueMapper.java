package com.ryc.api.v2.email.infra.mapper;

import com.ryc.api.v2.email.domain.InterviewReminderQueue;
import com.ryc.api.v2.email.infra.entity.InterviewReminderInfoEntity;
import com.ryc.api.v2.email.infra.entity.InterviewReminderQueueEntity;
import com.ryc.api.v2.interview.domain.InterviewSlot;
import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;
import com.ryc.api.v2.interview.infra.mapper.InterviewSlotMapper;

public class InterviewReminderQueueMapper {

  private InterviewReminderQueueMapper() {
    // private constructor to prevent instantiation
  }

  public static InterviewReminderQueue toDomain(InterviewReminderQueueEntity entity) {
    InterviewSlot slot = InterviewSlotMapper.toDomain(entity.getInterviewSlot());

    return InterviewReminderQueue.builder()
        .id(entity.getId())
        .applicantEmail(entity.getApplicantEmail())
        .status(entity.getStatus())
        .reminderDateTime(entity.getReminderDateTime())
        .interviewSlot(slot)
        .build();
  }

  public static InterviewReminderQueueEntity toEntity(
      InterviewReminderQueue domain, InterviewReminderInfoEntity reminderInfoEntity) {
    InterviewSlotEntity slot = InterviewSlotMapper.toEntity(domain.getInterviewSlot());

    return InterviewReminderQueueEntity.builder()
        .id(domain.getId())
        .applicantEmail(domain.getApplicantEmail())
        .status(domain.getStatus())
        .reminderDateTime(domain.getReminderDateTime())
        .interviewSlot(slot)
        .reminderInfo(reminderInfoEntity)
        .build();
  }
}
