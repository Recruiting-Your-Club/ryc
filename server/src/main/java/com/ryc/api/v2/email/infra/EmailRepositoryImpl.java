package com.ryc.api.v2.email.infra;

import java.util.List;
import java.util.stream.Collectors;

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
  public List<String> saveAll(List<Email> emails) {
    List<EmailEntity> emailEntities = emails.stream().map(EmailMapper::toEntity).toList();
    List<EmailEntity> savedEntities = emailJpaRepository.saveAll(emailEntities);
    return savedEntities.stream().map(EmailEntity::getId).collect(Collectors.toList());
  }
}
