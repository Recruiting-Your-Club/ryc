package com.ryc.api.v2.admin.domain;

import java.util.Optional;

public interface AdminRepository {
  Admin save(Admin admin);

  boolean existsByEmail(String email);

  Optional<Admin> findByEmail(String email);
}
