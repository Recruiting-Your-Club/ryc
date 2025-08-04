package com.ryc.api.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
      ApiErrorCodeExample apiErrorCodeExample =
          handlerMethod.getMethodAnnotation(ApiErrorCodeExample.class);
      if (apiErrorCodeExample != null) {

        // API 응답에 들어갈 예시 응답 생성
        List<ErrorCode> errorCodes = extractErrorCodes(apiErrorCodeExample);
        List<ExampleResponse> examples = createExampleResponses(errorCodes);

        // API 응답에 예시 추가
        ApiResponses responses = operation.getResponses();
        examples.forEach(example -> responses.addApiResponse(example.name(), example.item()));
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

  /*
   * ApiErrorCodeExample 어노테이션에서 지정한 에러 코드 enum을 추출합니다.
   * 이 메서드는 해당 enum의 모든 상수를 가져오고,
   * include 속성에 지정된 이름이 있는 에러 코드만 필터링합니다.
   */
  private List<ErrorCode> extractErrorCodes(ApiErrorCodeExample annotation) {
    List<ErrorCode> errorCodes = new ArrayList<>();
    Class<? extends ErrorCode>[] values = annotation.value();

    // include 속성에 지정된 에러 코드 이름을 Set으로 변환합니다.
    Set<String> includes = Set.of(annotation.include());

    for (Class<? extends ErrorCode> value : values) {
      ErrorCode[] allErrorCodes = value.getEnumConstants();
      List<ErrorCode> list =
          Arrays.stream(allErrorCodes)
              .filter(errorCode -> includes.isEmpty() || includes.contains(errorCode.name()))
              .toList();

      errorCodes.addAll(list);
    }

    return errorCodes;
  }

  /*
   * 에러 코드 목록을 기반으로 Swagger API 응답 예시를 생성합니다.
   */
  private List<ExampleResponse> createExampleResponses(List<ErrorCode> errorCodes) {
    List<ExampleResponse> responses = new ArrayList<>();
    Map<Integer, List<Example>> statusWithExamples = createStatusWithExamples(errorCodes);

    statusWithExamples.forEach(
        (status, examples) -> {
          Content content = new Content();
          MediaType mediaType = new MediaType();
          ApiResponse apiResponse = new ApiResponse();

          // mediaType에 예시를 추가합니다.
          examples.forEach(e -> mediaType.addExamples(e.getSummary(), e));

          // content에 mediaType을 추가합니다.
          content.addMediaType("application/json", mediaType);

          // apiResponse에 content를 설정합니다.
          apiResponse.setContent(content);

          responses.add(new ExampleResponse(status.toString(), apiResponse));
        });
    return responses;
  }

  /*
   * 에러 코드 목록을 기반으로 HTTP 상태 코드와 예시 응답을 매핑합니다.
   * 각 에러 코드는 HTTP 상태 코드에 따라 그룹화되어,
   * 해당 상태 코드에 대한 예시 응답을 생성합니다.
   */
  private Map<Integer, List<Example>> createStatusWithExamples(List<ErrorCode> errorCodes) {
    Map<Integer, List<Example>> statusWithExamples = new HashMap<>();

    errorCodes.forEach(
        e -> {
          int statusCode = e.getHttpStatus().value();
          Example example = createExample(e);

          // 상태 코드에 해당하는 예시들을 추가합니다.
          statusWithExamples.computeIfAbsent(statusCode, k -> new ArrayList<>()).add(example);
        });
    return statusWithExamples;
  }

  /*
   * 주어진 에러 코드에 대한 Swagger API 응답 예시를 생성합니다.
   * 이 메서드는 ErrorResponse 객체를 생성하고,
   * 해당 에러 코드의 이름과 메시지를 포함하는 예시를 반환합니다.
   */
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
