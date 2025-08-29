package com.ryc.api;

import java.util.TimeZone;

import jakarta.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAspectJAutoProxy
@EnableScheduling
@EnableJpaAuditing
@EnableAsync
@EnableRetry
@SpringBootApplication
@EntityScan(basePackages = {"com.ryc.api.v2"})
public class ApiApplication {

  @PostConstruct
  void initTimeZone() {
    TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
  }

  public static void main(String[] args) {
    System.setProperty("user.timezone", "Asia/Seoul");
    SpringApplication.run(ApiApplication.class, args);
  }
}
