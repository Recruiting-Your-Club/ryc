package com.ryc.api.v2.email.infra.mapper;

import java.util.List;

import com.ryc.api.v2.email.domain.InterviewReminderInfo;
import com.ryc.api.v2.email.domain.InterviewReminderQueue;
import com.ryc.api.v2.email.infra.entity.InterviewReminderInfoEntity;
import com.ryc.api.v2.email.infra.entity.InterviewReminderQueueEntity;

public class InterviewReminderInfoMapper {

  private InterviewReminderInfoMapper() {
    // private constructor to prevent instantiation
  }

  public static InterviewReminderInfo toDomain(InterviewReminderInfoEntity entity) {
    List<InterviewReminderQueue> reminderQueues =
        entity.getReminderQueues().stream().map(InterviewReminderQueueMapper::toDomain).toList();

    return InterviewReminderInfo.builder()
        .id(entity.getId())
        .announcementId(entity.getAnnouncementId())
        .relativeHour(entity.getRelativeHour())
        .reminderQueues(reminderQueues)
        .build();
  }

  public static InterviewReminderInfoEntity toEntity(InterviewReminderInfo domain) {
    InterviewReminderInfoEntity infoEntity =
        InterviewReminderInfoEntity.builder()
            .id(domain.getId())
            .announcementId(domain.getAnnouncementId())
            .relativeHour(domain.getRelativeHour())
            .build();

    List<InterviewReminderQueueEntity> reminderQueueEntities =
        domain.getReminderQueues().stream()
            .map(reminderQueue -> InterviewReminderQueueMapper.toEntity(reminderQueue, infoEntity))
            .toList();

    reminderQueueEntities.forEach(infoEntity::addReminderQueue);
    return infoEntity;
  }
}
