package com.ryc.api.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import com.ryc.api.v2.security.exception.RestAuthenticationEntryPoint;
import com.ryc.api.v2.security.exception.TokenAccessDeniedHandler;
import com.ryc.api.v2.security.filter.EmailPasswordAuthenticationFilter;
import com.ryc.api.v2.security.filter.JwtAuthenticationFilter;
import com.ryc.api.v2.security.jwt.JwtProperties;
import com.ryc.api.v2.security.jwt.JwtTokenManager;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  @Value("${SECURITY_WHITELIST_ALL_METHOD_PATHS}")
  private String[] whitelistAllPaths;

  @Value("${SECURITY_WHITELIST_GET_METHOD_PATHS}")
  private String[] whitelistGetPaths;

  @Value("${SECURITY_WHITELIST_POST_METHOD_PATHS}")
  private String[] whitelistPostPaths;

  @Value("${SECURITY_WHITELIST_PATCH_METHOD_PATHS}")
  private String[] whiteListPatchPaths;

  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final AuthenticationConfiguration authenticationConfiguration;
  private final JwtTokenManager jwtTokenManager;
  private final JwtProperties jwtProperties;
  private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
  private final ApplicationEventPublisher eventPublisher;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화
        .formLogin(AbstractHttpConfigurer::disable) // 폼 로그인 비활성
        .httpBasic(AbstractHttpConfigurer::disable) // 기본 인증 비활성
        .addFilterBefore(
            jwtAuthenticationFilter, EmailPasswordAuthenticationFilter.class) // jwt 인증 필터
        .addFilterAt(
            new EmailPasswordAuthenticationFilter(
                authenticationManager(authenticationConfiguration),
                eventPublisher,
                jwtTokenManager,
                jwtProperties),
            UsernamePasswordAuthenticationFilter.class) // email - password 로그인 필터
        .exceptionHandling(
            exceptions ->
                exceptions
                    .authenticationEntryPoint(new RestAuthenticationEntryPoint()) // 인증 진입점 설정
                    .accessDeniedHandler(tokenAccessDeniedHandler)) // 예외 처리 설정
        .sessionManagement(
            session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS)) // 세션 비활성 (HTTP 요청마다 인증 필요)
        .authorizeHttpRequests(
            request ->
                request
                    .requestMatchers(whitelistAllPaths)
                    .permitAll()
                    .requestMatchers(regexMatchers(whitelistPostPaths, HttpMethod.POST))
                    .permitAll()
                    .requestMatchers(regexMatchers(whiteListPatchPaths, HttpMethod.PATCH))
                    .permitAll()
                    .requestMatchers(regexMatchers(whitelistGetPaths, HttpMethod.GET))
                    .permitAll()
                    .anyRequest()
                    .authenticated());
    return http.build();
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  private RequestMatcher[] regexMatchers(String[] regexes, HttpMethod method) {
    return Arrays.stream(regexes)
        .map(
            pattern ->
                (RequestMatcher)
                    request ->
                        request.getMethod().equals(method.name())
                            && request.getRequestURI().matches(pattern))
        .toArray(RequestMatcher[]::new);
  }
}
