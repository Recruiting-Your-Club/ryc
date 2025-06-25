package com.ryc.api.v2.email.business;

import com.ryc.api.v2.email.domain.EmailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailSaverService {

  private final EmailRepository emailRepository;

  @Transactional
  public List<String> saveEmails(List<String> recipients, String subject, String content) {
    return emailRepository.saveAll(recipients, subject, content);
  }
}
