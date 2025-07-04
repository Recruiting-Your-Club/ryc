package com.ryc.api.v2.security.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.auth.domain.AdminRepository;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final AdminRepository adminRepository;

    @Override
    public CustomUserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
        return adminRepository.findByEmail(email)
                .map(CustomUserDetail::new)
                .orElseThrow(() -> new UsernameNotFoundException("admin not found"));
    }

    // TODO: UsernameNotFoundException, Custom Exception로 대체.
    public CustomUserDetail loadUserById(String id) throws UsernameNotFoundException {
        return adminRepository.findById(id)
                .map(CustomUserDetail::new)
                .orElseThrow(() -> new UsernameNotFoundException("admin not found"));
    }
}
