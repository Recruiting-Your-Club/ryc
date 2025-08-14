package com.ryc.api.v2.admin.domain;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AdminRepository {
  Admin save(Admin admin);

  boolean existsByEmail(String email);

  Optional<Admin> findByEmail(String email);

  Optional<Admin> findById(String id);

  Map<String, String> findThumbnailUrlByIds(List<String> adminIds);

  Map<String, String> findAdminNamesByIds(List<String> adminIds);
}
