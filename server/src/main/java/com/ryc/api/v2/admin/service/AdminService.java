package com.ryc.api.v2.admin.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final AdminRepository adminRepository;

  @Transactional(readOnly = true)
  public Admin getAdminById(String id) {
    return adminRepository
        .findById(id)
        .orElseThrow(() -> new NoSuchElementException("Admin not found with id: " + id));
  }
}
