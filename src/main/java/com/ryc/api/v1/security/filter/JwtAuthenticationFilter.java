package com.ryc.api.v1.security.filter;

import com.ryc.api.v1.security.dto.CustomUserDetail;
import com.ryc.api.v1.security.jwt.JwtTokenManager;
import com.ryc.api.v1.security.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenManager jwtTokenManager;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String requestURI = request.getRequestURI();
        if (requestURI.contains("api/v1/login") || requestURI.contains("api/v1/register")) {
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        String emailFromToken = null;
        String authToken = null;
        if (header != null && header.startsWith("Bearer ")) {
            authToken = header.replace("Bearer ", StringUtils.EMPTY);
            try {
                emailFromToken = jwtTokenManager.getEmailFromToken(authToken);
            } catch (Exception e) {
            }
        }

        final SecurityContext securityContext = SecurityContextHolder.getContext();

        if (emailFromToken != null && securityContext.getAuthentication() == null) {
            final CustomUserDetail userDetails = customUserDetailsService.loadUserByUsername(emailFromToken);

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
