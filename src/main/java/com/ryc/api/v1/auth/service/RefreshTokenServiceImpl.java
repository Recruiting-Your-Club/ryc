package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.domain.RefreshToken;
import com.ryc.api.v1.auth.dto.exception.InvalidRefreshTokenException;
import com.ryc.api.v1.auth.dto.exception.UnauthorizedUserException;
import com.ryc.api.v1.auth.dto.response.GenerateRefreshTokenResponse;
import com.ryc.api.v1.security.jwt.JwtTokenManager;
import com.ryc.api.v1.auth.repository.RefreshTokenRepository;
import com.ryc.api.v1.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenManager jwtTokenManager;

    @Override
    public GenerateRefreshTokenResponse generateRefreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalArgumentException("Refresh Token이 비어 있음");
        }

        if (!jwtTokenManager.validateRefreshToken(refreshToken)) {
            throw new InvalidRefreshTokenException("만료되었거나 유효하지 않은 Refresh Token");
        }

        String email = jwtTokenManager.getEmailFromToken(refreshToken);

        // 데이터베이스에 저장된 Refresh Token과 비교함으로써 Refresh Token이 탈취되었을 가능성을 방지 -> 보안
        RefreshToken storedToken = findByToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Refresh Token 값을 가진 유저가 존재하지 않음"));

        if (!storedToken.getUser().getEmail().equals(email)) {
            throw new UnauthorizedUserException("Refresh Token과 일치하는 유저 정보가 아님");
        }
        deleteByToken(refreshToken);

        String newAccessToken = jwtTokenManager.generateToken(email, storedToken.getUser().getRole().name());

        String newRefreshToken = jwtTokenManager.generateRefreshToken(email);
        updateRefreshToken(storedToken.getUser(), newRefreshToken, 7 * 24 * 60);

        return new GenerateRefreshTokenResponse(newRefreshToken, newAccessToken);
    }

    public void updateRefreshToken(User user, String newToken, long expirationMinutes) {
        refreshTokenRepository.deleteByToken(newToken);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(newToken)
                .expiration(LocalDateTime.now().plusMinutes(expirationMinutes))
                .build();
        refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    public void deleteByUser(User user) {
        refreshTokenRepository.deleteAllByUser(user);
    }

}
