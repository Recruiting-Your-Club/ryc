package com.ryc.api.v2.admin.domain;

public interface AdminRepository {
    Admin save(Admin admin);

    boolean existsByEmail(String email);

    Admin findByEmail(String email);
}
