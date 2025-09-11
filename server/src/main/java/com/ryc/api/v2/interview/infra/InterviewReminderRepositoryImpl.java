package com.ryc.api.v2.interview.infra;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.interview.domain.InterviewReminderRepository;
import com.ryc.api.v2.interview.domain.InterviewReminderSetting;
import com.ryc.api.v2.interview.infra.entity.InterviewReminderSettingEntity;
import com.ryc.api.v2.interview.infra.jpa.InterviewReminderJpaRepository;
import com.ryc.api.v2.interview.infra.mapper.InterviewReminderSettingMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InterviewReminderRepositoryImpl implements InterviewReminderRepository {

  private final InterviewReminderJpaRepository reminderJpaRepository;

  @Override
  public InterviewReminderSetting saveReminderSetting(
      InterviewReminderSetting interviewReminderSetting) {
    InterviewReminderSettingEntity entity =
        InterviewReminderSettingMapper.toEntity(interviewReminderSetting);
    InterviewReminderSettingEntity savedEntity = reminderJpaRepository.save(entity);
    return InterviewReminderSettingMapper.toDomain(savedEntity);
  }

  @Override
  public boolean existsReminderSettingByAnnouncementId(String announcementId) {
    return reminderJpaRepository.existsByAnnouncementId(announcementId);
  }

  @Override
  public InterviewReminderSetting findReminderSettingByAnnouncementId(String announcementId) {
    return reminderJpaRepository
        .findByAnnouncementId(announcementId)
        .map(InterviewReminderSettingMapper::toDomain)
        .orElseThrow(
            () ->
                new NoSuchElementException(
                    "No reminder setting found for announcementId: " + announcementId));
  }

  @Override
  public void deleteReminderSettingByAnnouncementId(String announcementId) {
    reminderJpaRepository.deleteByAnnouncementId(announcementId);
  }
}
