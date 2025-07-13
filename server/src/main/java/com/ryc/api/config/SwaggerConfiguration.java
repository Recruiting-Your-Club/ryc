package com.ryc.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfiguration {

  @Bean
  public OpenAPI openAPI() {
    String jwt = "JWT";
    SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);

    Components components =
        new Components()
            .addSecuritySchemes(
                jwt,
                new SecurityScheme()
                    .name(jwt)
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT"));

    return new OpenAPI()
        .components(components)
        .info(apiInfo())
        .addSecurityItem(securityRequirement);
  }

  private Info apiInfo() {
    return new Info().title("RYC API").description("Recruiting Your Club API 문서").version("1.0.0");
  }
}
