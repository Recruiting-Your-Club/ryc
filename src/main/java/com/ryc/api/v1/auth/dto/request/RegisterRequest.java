package com.ryc.api.v1.auth.dto.request;

import com.ryc.api.v1.user.domain.User;
import com.ryc.api.v1.user.domain.UserRole;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.security.crypto.password.PasswordEncoder;

public record RegisterRequest(@NotEmpty(message = "username is empty") String username,
                              @NotEmpty(message = "email is empty") String email,
                              @NotEmpty(message = "password is empty") String password,
                              UserRole role) {

    public RegisterRequest { //compact 생성자
        role = UserRole.USER;
    }

    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder()
                .username(this.username)
                .email(this.email)
                .password(passwordEncoder.encode(this.password))
                .role(this.role == null ? UserRole.USER : this.role) //한번 더 체크
                .build();
    }
}
