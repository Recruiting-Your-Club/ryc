package com.ryc.api.v2.security.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.security.dto.CustomUserDetail;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
  private final AdminRepository adminRepository;

  @Override
  public CustomUserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
    return new CustomUserDetail(adminRepository.findByEmail(email));
  }

  // TODO: UsernameNotFoundException, Custom Exception로 대체.
  public CustomUserDetail loadUserById(String id) throws UsernameNotFoundException {
    return new CustomUserDetail(adminRepository.findById(id));
  }
}
