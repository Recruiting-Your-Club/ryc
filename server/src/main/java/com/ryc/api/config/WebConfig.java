package com.ryc.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins(
            "http://localhost:3000",
            "http://localhost:3000/",
            "https://d24yror9k3fwgn.cloudfront.net/",
            "https://d24yror9k3fwgn.cloudfront.net") // 허용할 Origin
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
        .allowCredentials(true) // 쿠키 인증 요청 허용
        .allowedHeaders("*")
        .maxAge(3600); // 옵션 요청 캐시 시간 (초)
  }
}
