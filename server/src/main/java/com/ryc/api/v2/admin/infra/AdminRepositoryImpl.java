package com.ryc.api.v2.admin.infra;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.admin.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.admin.infra.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.NoSuchElementException;

@Repository
@RequiredArgsConstructor
public class AdminRepositoryImpl implements AdminRepository {
    private final AdminJpaRepository adminJpaRepository;

    @Override
    public Admin save(Admin admin) {
        return AdminMapper.toDomain(adminJpaRepository.save(AdminMapper.toEntity(admin)));
    }

    @Override
    public boolean existsByEmail(String email) {
        return adminJpaRepository.existsByEmail(email);
    }

    @Override
    public Admin findByEmail(String email) {
        return AdminMapper.toDomain(
                adminJpaRepository.findByEmail(email)
                        .orElseThrow(() -> new NoSuchElementException("Admin is not exist"))
        );
    }
}
