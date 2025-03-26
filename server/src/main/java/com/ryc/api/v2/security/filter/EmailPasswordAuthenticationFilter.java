package com.ryc.api.v2.security.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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

// TODO: 빈등록 필요성
@RequiredArgsConstructor
public class EmailPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenManager jwtTokenManager;

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
      return objectMapper.readValue(requestBody, new TypeReference<Map<String, String>>() {});

    } catch (Exception e) {
      throw new AuthenticationException("Failed to parse request body") {};
    }
  }

  @Override
  protected void successfulAuthentication(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain,
      Authentication authentication) {
    // JWT 토큰 발급 로직 추가
    CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();
    String email = customUserDetail.getEmail();

    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
    GrantedAuthority auth = iterator.next(); // 사용자의 권한 중, 첫번째 권한 불러오기

    String role = auth.getAuthority();

    String accessToken = jwtTokenManager.generateAccessToken(email, role);

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
