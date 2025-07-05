package com.ryc.api.v2.security.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import com.ryc.api.v2.auth.service.AuthService;
import com.ryc.api.v2.security.jwt.JwtProperties;
import com.ryc.api.v2.security.jwt.TokenType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ryc.api.v2.security.dto.CustomUserDetail;
import com.ryc.api.v2.security.jwt.JwtTokenManager;

import lombok.RequiredArgsConstructor;

// Bean 객체 아님 주의
@RequiredArgsConstructor
public class EmailPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenManager jwtTokenManager;
    private final JwtProperties jwtProperties;

    private final AuthService authService;

    {
        setFilterProcessesUrl("/api/v2/auth/login");
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        Map<String, String> requestBody = parseRequestFromJson(request);
        String email = requestBody.get("email");
        String password = requestBody.get("password");

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                        email, password, null); // 토큰은 재정의 할 필요없이, username에 해당하는 값에 email 값 대입
        return authenticationManager.authenticate(authToken);
    }

    private Map<String, String> parseRequestFromJson(HttpServletRequest request) {
        try {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String requestBody = sb.toString();

            // JSON 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(requestBody, new TypeReference<Map<String, String>>() {
            });

        } catch (Exception e) {
            throw new AuthenticationException("Failed to parse request body") {
            };
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication) {

        CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();
        String adminId = customUserDetail.getId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next(); // 사용자의 권한 중, 첫번째 권한 불러오기

        String role = auth.getAuthority();

        String accessToken = jwtTokenManager.generateAccessToken(adminId, role);
        String refreshToken = jwtTokenManager.generateRefreshToken(adminId, role);

        LocalDateTime expirationTime =
                jwtTokenManager.getExpirationDateFromToken(TokenType.REFRESH_TOKEN,refreshToken)
                        .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

        String savedRefreshToken = authService.saveRefreshToken(adminId, refreshToken, expirationTime);

        //RT HttpOnly, Secure, SameSite=Strict 쿠키 옵션 설정
        ResponseCookie cookie = ResponseCookie.from("refreshToken", savedRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/api/v2/auth/refreshToken")
                .maxAge(jwtProperties.getRefreshToken().getExpirationMinute() * 60L)
                .sameSite("Strict")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String jsonResponse =
                """
                        {
                            "accessToken": "%s",
                            "tokenType": "Bearer"
                        }
                        """
                        .formatted(accessToken);
        try {
            response.getWriter().write(jsonResponse);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
