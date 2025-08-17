package com.ryc.api.v2.email.infra;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.email.domain.Email;
import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.infra.entity.EmailEntity;
import com.ryc.api.v2.email.infra.jpa.EmailJpaRepository;
import com.ryc.api.v2.email.infra.mapper.EmailMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailRepositoryImpl implements EmailRepository {

  private final EmailJpaRepository emailJpaRepository;

  @Override
  public Email save(Email email) {
    EmailEntity emailEntity = EmailMapper.toEntity(email);
    EmailEntity savedEntity = emailJpaRepository.save(emailEntity);
    return EmailMapper.toDomain(savedEntity);
  }

  @Override
  public List<Email> saveAll(List<Email> emails) {
    List<EmailEntity> emailEntities = emails.stream().map(EmailMapper::toEntity).toList();
    List<EmailEntity> savedEntities = emailJpaRepository.saveAll(emailEntities);
    return savedEntities.stream().map(EmailMapper::toDomain).toList();
  }

  @Override
  public List<Email> findPendingEmails(Pageable pageable) {
    return emailJpaRepository.findPendingEmails(pageable).stream()
        .map(EmailMapper::toDomain)
        .toList();
  }

  @Override
  public void deleteAllByAnnouncementId(String announcementId) {
    emailJpaRepository.deleteAllByAnnouncementId(announcementId);
  }

  @Override
  public void deleteAllByAdminId(String adminId) {
    emailJpaRepository.deleteBySenderId(adminId);
  }
}
