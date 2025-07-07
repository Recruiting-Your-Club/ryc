package com.ryc.api.v2.security.filter;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ryc.api.v2.security.dto.CustomUserDetail;
import com.ryc.api.v2.security.exception.RestAuthenticationEntryPoint;
import com.ryc.api.v2.security.jwt.JwtTokenManager;
import com.ryc.api.v2.security.jwt.TokenType;
import com.ryc.api.v2.security.service.CustomUserDetailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private static final AntPathMatcher pathMatcher = new AntPathMatcher();
  private static final List<String> EXCLUDE_URLS =
      List.of("/api/v2/auth/login", "/api/v2/auth/register");
  private final JwtTokenManager jwtTokenManager;
  private final CustomUserDetailService customUserDetailService;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      final String requestURI = request.getRequestURI();
      if (isExcludedUrl(requestURI)) {
        filterChain.doFilter(request, response);
        return;
      }

      String header = request.getHeader("Authorization");
      String adminIdFromToken = null;
      String authToken = null;
      if (header != null && header.startsWith("Bearer ")) {
        authToken = header.replace("Bearer ", StringUtils.EMPTY);
        adminIdFromToken = jwtTokenManager.getAdminIdFromToken(TokenType.ACCESS_TOKEN, authToken);
      }

      final SecurityContext securityContext = SecurityContextHolder.getContext();

      if (adminIdFromToken != null && securityContext.getAuthentication() == null) {
        final CustomUserDetail userDetails = customUserDetailService.loadUserById(adminIdFromToken);

        if (jwtTokenManager.validateToken(TokenType.ACCESS_TOKEN, authToken, userDetails.getId())) {
          final UsernamePasswordAuthenticationToken authentication =
              new UsernamePasswordAuthenticationToken(
                  userDetails, null, userDetails.getAuthorities());
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          securityContext.setAuthentication(authentication);
        }
      }

      filterChain.doFilter(request, response);
    } catch (AuthenticationException e) {
      new RestAuthenticationEntryPoint().commence(request, response, e);
    }
  }

  private boolean isExcludedUrl(String requestURI) {
    return EXCLUDE_URLS.stream().anyMatch(pattern -> pathMatcher.match(pattern, requestURI));
  }
}
