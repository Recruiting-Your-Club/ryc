package com.ryc.api.v1.auth.dto;

import com.ryc.api.v1.member.domain.Member;
import com.ryc.api.v1.member.domain.UserRole;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.security.crypto.password.PasswordEncoder;

public record RegisterRequest(@NotEmpty(message = "username is empty") String username,
                              @NotEmpty(message = "email is empty") String email,
                              @NotEmpty(message = "password is empty") String password,
                              UserRole role) {

    public RegisterRequest { //compact 생성자
        role = UserRole.USER;
    }

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .username(this.username)
                .email(this.email)
                .password(passwordEncoder.encode(this.password))
                .role(this.role == null ? UserRole.USER : this.role) //한번 더 체크
                .build();
    }
}
