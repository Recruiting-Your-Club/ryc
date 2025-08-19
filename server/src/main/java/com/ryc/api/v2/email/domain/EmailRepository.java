package com.ryc.api.v2.email.domain;

import java.util.List;

import org.springframework.data.domain.Pageable;

public interface EmailRepository {

  Email save(Email email);

  List<Email> saveAll(List<Email> emails);

  List<Email> findPendingEmails(Pageable pageable);

  void deleteAllByAnnouncementId(String announcementId);

  void deleteAllByAdminId(String adminId);
}
