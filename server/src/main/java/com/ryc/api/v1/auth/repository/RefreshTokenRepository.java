package com.ryc.api.v1.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v1.auth.domain.RefreshToken;
import com.ryc.api.v1.user.domain.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
  Optional<RefreshToken> findByToken(String token);

  void deleteByToken(String token);

  void deleteAllByUser(User user);
}
