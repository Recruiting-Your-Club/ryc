package com.ryc.api.v2.auth.presentation;

import com.ryc.api.v2.auth.presentation.request.LoginRequest;
import com.ryc.api.v2.auth.presentation.request.RegisterRequest;
import com.ryc.api.v2.auth.presentation.response.RegisterResponse;
import com.ryc.api.v2.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v2/auth")
@RequiredArgsConstructor
@Tag(name = "인증/인가")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "사용자 로그인 인증 후, 인증 성공시 토큰 발행")
    public void login(@RequestBody LoginRequest loginRequest) {
        // 이 메서드는 실제로 작동하지 않습니다.
        // UsernamePasswordAuthenticationFilter가 이 경로를 가로채어 인증을 처리합니다.
        throw new IllegalStateException(
                "This method should not be called. It's handled by Spring Security filter chain.");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest body) {
        RegisterResponse response = authService.register(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
