package com.ryc.api.v1.security.service;

import com.ryc.api.v1.member.domain.Member;
import com.ryc.api.v1.member.repository.MemberRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public CustomUserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email);
        if (member == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new CustomUserDetail(member);
    }
}
