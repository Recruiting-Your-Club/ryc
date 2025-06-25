package com.ryc.api.v2.email.infra;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.email.domain.EmailRepository;
import com.ryc.api.v2.email.infra.jpa.EmailJpaRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class EmailRepositoryImpl implements EmailRepository {

  private final EmailJpaRepository emailJpaRepository;

  @Override
  public List<String> saveAll(List<String> recipients, String subject, String content) {
    return List.of();
  }
}
