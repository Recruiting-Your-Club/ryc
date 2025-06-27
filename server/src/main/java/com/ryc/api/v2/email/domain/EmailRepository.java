package com.ryc.api.v2.email.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;

public interface EmailRepository {

  List<Email> saveAll(List<Email> emails);

  List<Email> findPendingEmails(Pageable pageable);
}
