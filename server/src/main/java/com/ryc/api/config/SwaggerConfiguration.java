package com.ryc.api.config;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.common.exception.code.ErrorCode;
import com.ryc.api.v2.common.exception.response.ErrorResponse;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.examples.Example;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfiguration {

  @Bean
  public OpenAPI openAPI() {
    String jwt = "JWT";
    SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);

    // 에러 코드 예시 생성
    Map<String, Example> announcementErrorExamples =
        Arrays.stream(AnnouncementErrorCode.values())
            .collect(Collectors.toMap(AnnouncementErrorCode::name, this::createErrorExample));

    // AnnouncementBadRequest(400) 응답 정의
    ApiResponse announcementBadRequestResponse =
        new ApiResponse()
            .description("Bad Request")
            .content(
                new Content()
                    .addMediaType(
                        "application/json", new MediaType().examples(announcementErrorExamples)));

    Components components =
        new Components()
            .addSecuritySchemes(
                jwt,
                new SecurityScheme()
                    .name(jwt)
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT"))
            .addResponses(
                "AnnouncementBadRequest",
                announcementBadRequestResponse); // AnnouncementBadRequest 응답 추가

    return new OpenAPI()
        .components(components)
        .info(apiInfo())
        .addSecurityItem(securityRequirement);
  }

  private Info apiInfo() {
    return new Info().title("RYC API").description("Recruiting Your Club API 문서").version("1.0.0");
  }

  // ErrorCode 예시문 작성 코드
  private Example createErrorExample(ErrorCode errorCode) {
    ErrorResponse errorResponse =
        ErrorResponse.builder().code(errorCode.name()).message(errorCode.getMessage()).build();
    return new Example().value(errorResponse);
  }
}
