package com.ryc.api.v2.admin.domain;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/*
 * AdminEntity는 Soft Delete를 지원합니다.
 * AdminEntity를 조회할 때는 항상 isDeleted가 false인 것만 조회합니다.
 * AdminEntity를 삭제할 때는 isDeleted를 true로 변경합니다.
 */
public interface AdminRepository {
  Admin save(Admin admin);

  boolean existsByEmail(String email);

  Optional<Admin> findByEmail(String email);

  Optional<Admin> findById(String id);

  Map<String, String> findThumbnailUrlByIds(List<String> adminIds);

  Map<String, String> findAdminNamesByIds(List<String> adminIds);

  void deleteById(String adminId);
}
