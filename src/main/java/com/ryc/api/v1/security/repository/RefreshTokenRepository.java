package com.ryc.api.v1.security.repository;

import com.ryc.api.v1.auth.domain.RefreshToken;
import com.ryc.api.v1.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
    void deleteAllByUser(User user);


}
