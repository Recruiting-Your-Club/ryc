package com.ryc.api.v2.email.infra;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.email.domain.InterviewReminderInfo;
import com.ryc.api.v2.email.domain.InterviewReminderRepository;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.email.infra.entity.InterviewReminderInfoEntity;
import com.ryc.api.v2.email.infra.jpa.InterviewReminderJpaRepository;
import com.ryc.api.v2.email.infra.mapper.InterviewReminderInfoMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InterviewReminderRepositoryImpl implements InterviewReminderRepository {

  private final InterviewReminderJpaRepository jpaRepository;

  @Override
  public InterviewReminderInfo save(InterviewReminderInfo interviewReminderInfo) {
    InterviewReminderInfoEntity entity =
        InterviewReminderInfoMapper.toEntity(interviewReminderInfo);
    InterviewReminderInfoEntity savedEntity = jpaRepository.save(entity);
    return InterviewReminderInfoMapper.toDomain(savedEntity);
  }

  @Override
  public List<InterviewReminderInfo> saveAll(List<InterviewReminderInfo> reminderInfos) {
    List<InterviewReminderInfoEntity> entities =
        reminderInfos.stream().map(InterviewReminderInfoMapper::toEntity).toList();
    return jpaRepository.saveAll(entities).stream()
        .map(InterviewReminderInfoMapper::toDomain)
        .toList();
  }

  @Override
  public boolean existsByAnnouncementId(String announcementId) {
    return jpaRepository.existsByAnnouncementId(announcementId);
  }

  @Override
  public InterviewReminderInfo findByAnnouncementId(String announcementId) {
    return jpaRepository
        .findByAnnouncementId(announcementId)
        .map(InterviewReminderInfoMapper::toDomain)
        .orElseThrow(
            () ->
                new NoSuchElementException(
                    "No reminder setting found for announcementId: " + announcementId));
  }

  @Override
  public void deleteByAnnouncementId(String announcementId) {
    jpaRepository.deleteByAnnouncementId(announcementId);
  }

  @Override
  public List<InterviewReminderInfo> findAllByStatus(EmailSentStatus status) {
    return jpaRepository.findAllByStatus(status).stream()
        .map(InterviewReminderInfoMapper::toDomain)
        .toList();
  }
}
