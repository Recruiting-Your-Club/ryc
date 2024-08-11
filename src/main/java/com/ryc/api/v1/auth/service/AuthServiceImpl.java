package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.dto.RegisterRequest;
import com.ryc.api.v1.auth.dto.RegisterResponse;
import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.userRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final userRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public RegisterResponse register(RegisterRequest body) {
        String email = body.email();
        if(userRepository.existsByEmail(email)){
            throw new DuplicateKeyException("This email Already Used");
        }

        User user = body.toUser(bCryptPasswordEncoder);
        User savedUser = userRepository.save(user);
        return new RegisterResponse(savedUser.getCreatedAt());
    }
}
