package com.ryc.api.v2.auth.service;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.admin.domain.AdminRepository;
import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.presentation.response.RegisterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public RegisterResponse register(RegisterRequest body) {
        final String email = body.email();
        if (adminRepository.existsByEmail(email)) {
            throw new DuplicateKeyException("This email Already Used");
        }

        //TODO: URL 처리 로직 필요
        final String ImageUrlFromS3 = "MOCK_URL";
        final String ThumbnailUrlFromS3 = "MOCK_URL";

        final Admin admin = Admin.initialize(
                body.name(),
                body.email(),
                bCryptPasswordEncoder.encode(body.password()), //암호화/복호화는 반드시 서비스 로직에서 진행
                ImageUrlFromS3,
                ThumbnailUrlFromS3
        );
        Admin savedAdmin = adminRepository.save(admin);

        return new RegisterResponse(savedAdmin.getId());
    }

    //TODO: Logout 구현
}
