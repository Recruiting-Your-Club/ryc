package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.dto.RegisterRequest;
import com.ryc.api.v1.auth.dto.RegisterResponse;
import com.ryc.api.v1.security.jwt.JwtTokenManager;
import com.ryc.api.v1.security.service.RefreshTokenService;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenManager jwtTokenManager;
    private final RefreshTokenService refreshTokenService;

    @Override
    public RegisterResponse register(RegisterRequest body) {
        String email = body.email();
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateKeyException("This email Already Used");
        }

        User user = body.toUser(bCryptPasswordEncoder);
        User savedUser = userRepository.save(user);
        return new RegisterResponse(savedUser.getCreatedAt());
    }

    @Override
    public ResponseEntity logoutUser(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid Authorization header"));
        }

        String token = authorizationHeader.replace("Bearer ", "");
        String email = jwtTokenManager.getEmailFromToken(token);
        User user = userRepository.findByEmail(email);
        if (user != null) {
            refreshTokenService.deleteByUser(user);
        }

        return ResponseEntity.ok(Map.of("message", "Successful"));
    }
}