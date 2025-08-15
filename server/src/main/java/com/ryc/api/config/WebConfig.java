package com.ryc.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Value("${CLIENT_URL}/")
  private String CLIENT_URL;

  @Value("${LOCAL_CLIENT_URL}")
  private String LOCAL_CLIENT_URL;

  @Value("${LOCAL_CLIENT_HTTPS_URL}")
  private String LOCAL_CLIENT_HTTPS_URL;

  @Value("${DEV_SERVER_URL}")
  private String DEV_SERVER_URL;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins(
            CLIENT_URL,
            CLIENT_URL + "/",
            LOCAL_CLIENT_URL,
            LOCAL_CLIENT_URL + "/",
            LOCAL_CLIENT_HTTPS_URL,
            LOCAL_CLIENT_HTTPS_URL + "/",
            DEV_SERVER_URL,
            DEV_SERVER_URL + "/") // 허용할 Origin
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
        .allowCredentials(true) // 쿠키 인증 요청 허용
        .allowedHeaders("*")
        .maxAge(3600); // 옵션 요청 캐시 시간 (초)
  }
}
