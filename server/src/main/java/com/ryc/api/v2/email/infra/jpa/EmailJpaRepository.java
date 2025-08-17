package com.ryc.api.v2.email.infra.jpa;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.email.infra.entity.EmailEntity;

public interface EmailJpaRepository extends JpaRepository<EmailEntity, String> {

  // 이메일 전송 상태가 PENDING인 이메일을 생성일 기준으로 오름차순 정렬하여 조회
  @Query("SELECT e FROM EmailEntity e WHERE e.status = 'PENDING'")
  List<EmailEntity> findPendingEmails(Pageable pageable);

  void deleteAllByAnnouncementId(String announcementId);
}
