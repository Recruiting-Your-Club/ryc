package com.ryc.api.config;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ryc.api.v2.common.aop.annotation.HasRole;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@OpenAPIDefinition(
    servers = {
      @Server(url = "${DEV_SERVER_URL}", description = "개발 서버"),
      @Server(url = "${LOCAL_SERVER_URL}", description = "로컬 서버")
    })
@Configuration
public class SwaggerConfiguration {
  @Bean
  public OpenAPI openAPI() {
    String jwt = "JWT";
    SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);
    SecurityScheme securityScheme =
        new SecurityScheme()
            .name(jwt)
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT");

    Components components = new Components().addSecuritySchemes(jwt, securityScheme);

    return new OpenAPI()
        .info(apiInfo())
        .addSecurityItem(securityRequirement)
        .components(components);
  }

  @Bean
  public OperationCustomizer clubIdHeader() {
    return (operation, handlerMethod) -> {
      // 조건: @HasRole 어노테이션이 붙은 API만 적용
      if (handlerMethod.hasMethodAnnotation(HasRole.class)) {
        Parameter clubIdHeader =
            new Parameter()
                .in("header")
                .name("X-Club-ID")
                .description("동아리 식별자 헤더")
                .required(true)
                .schema(new StringSchema());

        operation.addParametersItem(clubIdHeader);
      }
      return operation;
    };
  }

  private Info apiInfo() {
    return new Info().title("RYC API").description("Recruiting Your Club API 문서").version("1.0.0");
  }
}
