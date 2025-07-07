package com.ryc.api.v2.auth.service;

import java.time.LocalDateTime;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.auth.domain.RefreshToken;
import com.ryc.api.v2.auth.domain.RefreshTokenRepository;
import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.presentation.response.RegisterResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final AdminRepository adminRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Transactional
  public RegisterResponse register(RegisterRequest body) {
    final String email = body.email();
    if (adminRepository.existsByEmail(email)) {
      // TODO: DuplicateKeyException 대신 HttpStatus.CONFLICT와 IllegalStateException 사용 고려
      throw new DuplicateKeyException("This email Already Used");
    }

    final Admin admin =
        Admin.initialize(
            body.name(),
            body.email(),
            bCryptPasswordEncoder.encode(body.password())); // 암호화/복호화는 반드시 서비스 로직에서 진행
    Admin savedAdmin = adminRepository.save(admin);

    return new RegisterResponse(savedAdmin.getId());
  }

  @Transactional
  public String saveRefreshToken(String adminId, String tokenValue, LocalDateTime expirationTime) {
    RefreshToken refreshToken = RefreshToken.initialize(adminId, tokenValue, expirationTime);

    Admin admin =
        adminRepository
            .findById(adminId)
            .orElseThrow(() -> new EntityNotFoundException("Admin not found with id: " + adminId));

    RefreshToken savedRefreshToken = refreshTokenRepository.save(refreshToken, admin);
    return savedRefreshToken.getToken();
  }

  // TODO: Logout 구현
}
