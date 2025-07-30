package com.ryc.api.config;

import java.util.*;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ryc.api.v2.common.aop.annotation.HasRole;
import com.ryc.api.v2.common.exception.annotation.ApiErrorCodeExample;
import com.ryc.api.v2.common.exception.code.ErrorCode;
import com.ryc.api.v2.common.exception.response.ErrorResponse;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.examples.Example;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@OpenAPIDefinition(
    servers = {
      @Server(url = "${DEV_SERVER_URL}", description = "개발 서버"),
      @Server(url = "${LOCAL_SERVER_URL}", description = "로컬 서버")
    })
@Configuration
public class SwaggerConfiguration {

  private record ExampleResponse(String name, ApiResponse item) {}

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
  public OperationCustomizer operationCustomizer() {
    return (operation, handlerMethod) -> {

      // 조건: @ApiErrorCodeExample 어노테이션이 붙은 API만 적용
      if (handlerMethod.hasMethodAnnotation(ApiErrorCodeExample.class)) {
        Class<? extends ErrorCode> value =
            handlerMethod.getMethodAnnotation(ApiErrorCodeExample.class).value();

        if (value != null) {
          ApiResponses responses = operation.getResponses();
          List<ExampleResponse> examples = createExampleResponses(value.getEnumConstants());

          examples.forEach(example -> responses.addApiResponse(example.name(), example.item()));
        }
      }

      // 조건: @HasRole 어노테이션이 붙은 API만 적용
      if (handlerMethod.hasMethodAnnotation(HasRole.class)) {
        Parameter clubIdHeader = createClubIdHeader();
        operation.addParametersItem(clubIdHeader);
      }

      return operation;
    };
  }

  private Info apiInfo() {
    return new Info().title("RYC API").description("Recruiting Your Club API 문서").version("1.0.0");
  }

  private List<ExampleResponse> createExampleResponses(ErrorCode[] errorCodes) {
    List<ExampleResponse> responses = new ArrayList<>();
    Map<Integer, List<Example>> statusWithExamples = createStatusWithExamples(errorCodes);

    statusWithExamples.forEach(
        (status, examples) -> {
          Content content = new Content();
          MediaType mediaType = new MediaType();
          ApiResponse apiResponse = new ApiResponse();

          examples.forEach(e -> mediaType.addExamples(e.getSummary(), e));
          content.addMediaType("application/json", mediaType);
          apiResponse.setContent(content);
          responses.add(new ExampleResponse(status.toString(), apiResponse));
        });
    return responses;
  }

  private Map<Integer, List<Example>> createStatusWithExamples(ErrorCode[] errorCodes) {
    Map<Integer, List<Example>> statusWithExamples = new HashMap<>();

    for (ErrorCode errorCode : errorCodes) {
      int statusCode = errorCode.getHttpStatus().value();
      Example example = createExample(errorCode);

      statusWithExamples.computeIfAbsent(statusCode, k -> new ArrayList<>()).add(example);
    }
    return statusWithExamples;
  }

  private Example createExample(ErrorCode errorCode) {
    Example example = new Example();
    ErrorResponse response =
        ErrorResponse.builder().code(errorCode.name()).message(errorCode.getMessage()).build();

    example.summary(errorCode.name());
    example.value(response);
    return example;
  }

  private Parameter createClubIdHeader() {
    return new Parameter()
        .in("header")
        .name("X-CLUB-ID")
        .description("동아리 식별자 헤더")
        .required(true)
        .schema(new StringSchema());
  }
}
