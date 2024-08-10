package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.dto.RegisterRequest;
import com.ryc.api.v1.auth.dto.RegisterResponse;
import com.ryc.api.v1.member.domain.Member;
import com.ryc.api.v1.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public RegisterResponse register(RegisterRequest body) {
        String email = body.email();
        if(memberRepository.existsByEmail(email)){
            throw new DuplicateKeyException("This email Already Used");
        }

        Member member = body.toMember(bCryptPasswordEncoder);
        Member savedMember = memberRepository.save(member);
        return new RegisterResponse(savedMember.getCreatedAt());
    }
}
