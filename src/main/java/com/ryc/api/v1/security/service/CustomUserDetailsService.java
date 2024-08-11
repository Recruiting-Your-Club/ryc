package com.ryc.api.v1.security.service;

import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.repository.userRepository;
import com.ryc.api.v1.security.dto.CustomUserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final userRepository userRepository;

    @Override
    public CustomUserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new CustomUserDetail(user);
    }
}
