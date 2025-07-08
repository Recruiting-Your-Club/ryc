package com.ryc.api.v2.auth.service;

import java.time.LocalDateTime;
import java.time.ZoneId;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminDefaultRole;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.auth.domain.RefreshToken;
import com.ryc.api.v2.auth.domain.RefreshTokenRepository;
import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.presentation.response.RegisterResponse;
import com.ryc.api.v2.auth.service.dto.TokenRefreshResult;
import com.ryc.api.v2.security.jwt.JwtTokenManager;
import com.ryc.api.v2.security.jwt.TokenType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final AdminRepository adminRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final JwtTokenManager jwtTokenManager;

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

  // TODO: Spring Security Filter 내로 로직 이전 필요.
  @Transactional
  public TokenRefreshResult refreshToken(String refreshToken) {
    // 1. rt 유효성 검사
    // TODO: rt claim에서 사용자 id 제외
    String adminIdFromToken =
        jwtTokenManager.getAdminIdFromToken(TokenType.REFRESH_TOKEN, refreshToken);

    if (!jwtTokenManager.validateToken(TokenType.REFRESH_TOKEN, refreshToken, adminIdFromToken)) {
      // TODO: 이때 Authentication Exception 발생 -> GlobalExceptionHanler에 추가 필요.
      //  다만, 추후 filter로 이전시에는 해당 로직 필요 없음.
    }

    // 2. rt로 사용자 조회
    Admin admin =
        refreshTokenRepository
            .findAdminByToken(refreshToken)
            .orElseThrow(() -> new EntityNotFoundException("Refresh token not found."));

    // 3. 신규 at 생성
    final String accessToken =
        jwtTokenManager.generateAccessToken(admin.getId(), AdminDefaultRole.USER.name());

    // 4. 기존 rt db삭제
    if (!refreshTokenRepository.deleteRefreshToken(refreshToken)) {
      throw new EntityNotFoundException("RefreshToken not found");
    }

    // TODO: 추후 update 방식으로 수정하는 것이 안전할 것으로 보임.
    refreshTokenRepository.flush();

    // 5. 신규 rt 생성 & DB 저장
    // TODO: claim 수정
    // TODO: RefreshToken 날짜값 JWT 패키지로 함수 분리
    final String newRefreshTokenValue =
        jwtTokenManager.generateRefreshToken(admin.getId(), AdminDefaultRole.USER.name());
    final RefreshToken newRefreshToken =
        RefreshToken.builder()
            .token(newRefreshTokenValue)
            .adminId(admin.getId())
            .expirationTime(
                jwtTokenManager
                    .getExpirationDateFromToken(TokenType.REFRESH_TOKEN, newRefreshTokenValue)
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime())
            .build();
    refreshTokenRepository.save(newRefreshToken, admin);

    // 6. 신규 at, rt 전송
    return new TokenRefreshResult(accessToken, newRefreshTokenValue);
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
