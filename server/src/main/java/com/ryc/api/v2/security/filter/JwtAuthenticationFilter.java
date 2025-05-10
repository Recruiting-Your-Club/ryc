package com.ryc.api.v2.security.filter;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ryc.api.v2.security.dto.CustomUserDetail;
import com.ryc.api.v2.security.jwt.JwtTokenManager;
import com.ryc.api.v2.security.service.CustomUserDetailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtTokenManager jwtTokenManager;
  private final CustomUserDetailService customUserDetailService;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    final String requestURI = request.getRequestURI();
    // 로그인, 회원가입의 경우, 해당 필터 검증 Skip
    if (requestURI.contains("api/v2/auth/login") || requestURI.contains("api/v2/auth/register")) {
      filterChain.doFilter(request, response);
      return;
    }

    String header = request.getHeader("Authorization");
    String emailFromToken = null;
    String authToken = null;
    if (header != null && header.startsWith("Bearer ")) {
      authToken = header.replace("Bearer ", StringUtils.EMPTY);
      try {
        emailFromToken = jwtTokenManager.getEmailFromAccessToken(authToken);
      } catch (Exception e) {
      }
    }

    final SecurityContext securityContext = SecurityContextHolder.getContext();

    if (emailFromToken != null && securityContext.getAuthentication() == null) {
      final CustomUserDetail userDetails =
          customUserDetailService.loadUserByUsername(emailFromToken);

      if (jwtTokenManager.validateToken(authToken, userDetails.getEmail())) {
        final UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        securityContext.setAuthentication(authentication);
      }
    }

    filterChain.doFilter(request, response);
  }
}
