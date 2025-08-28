package com.ryc.api.config;

import java.util.*;
import java.util.regex.Matcher;
import java.util.stream.Collectors;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.HandlerMethod;

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

  /*
   * HTTP 메서드와 경로를 저장하는 레코드 클래스입니다.
   */
  private record HttpOperation(String method, String path) {}

  /*
   * Swagger API 응답 예시를 저장하는 레코드 클래스입니다.
   */
  private record ExampleResponse(String name, ApiResponse item) {}

  private final Set<String> whitelistGetPatterns;
  private final Set<String> whitelistPostPatterns;
  private final Set<String> whitelistPatchPatterns;

  /*
   * SwaggerConfiguration 생성자입니다.
   * 이 생성자는 애플리케이션 설정 파일에서 화이트리스트 경로를 읽어와
   * 각 경로를 슬래시("/")로 시작하도록 보장합니다.
   * 각 경로의 변수 부분은 더미 UUID로 대체하여
   * Swagger 문서에서 일관된 예시를 제공합니다.
   */
  public SwaggerConfiguration(
      @Value("${SECURITY_WHITELIST_GET_METHOD_PATHS}") String[] whitelistGetPatterns,
      @Value("${SECURITY_WHITELIST_POST_METHOD_PATHS}") String[] whitelistPostPatterns,
      @Value("${SECURITY_WHITELIST_PATCH_METHOD_PATHS}") String[] whitelistPatchPatterns) {
    this.whitelistGetPatterns =
        Arrays.stream(whitelistGetPatterns)
            .map(path -> path.startsWith("/") ? path : "/" + path)
            .collect(Collectors.toSet());

    this.whitelistPostPatterns =
        Arrays.stream(whitelistPostPatterns)
            .map(path -> path.startsWith("/") ? path : "/" + path)
            .collect(Collectors.toSet());

    this.whitelistPatchPatterns =
        Arrays.stream(whitelistPatchPatterns)
            .map(path -> path.startsWith("/") ? path : "/" + path)
            .collect(Collectors.toSet());
  }

  @Bean
  public OpenAPI openAPI() {
    String jwt = "JWT";
    SecurityScheme securityScheme =
        new SecurityScheme()
            .name(jwt)
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT");
    Components components = new Components().addSecuritySchemes(jwt, securityScheme);
    Info apiInfo =
        new Info().title("RYC API").description("Recruiting Your Club API 문서").version("1.0.0");

    return new OpenAPI().info(apiInfo).components(components);
  }

  @Bean
  public OperationCustomizer operationCustomizer() {
    return (operation, handlerMethod) -> {

      // HTTP 메서드와 경로를 추출하여 보안이 필요한 API에 JWT 보안 요구 사항을 추가합니다.
      HttpOperation httpOperation = extractHttpOperation(handlerMethod);
      if (!isWhitelistPath(httpOperation)) {
        operation.addSecurityItem(new SecurityRequirement().addList("JWT"));
      }

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

  /*
   * HandlerMethod에서 HTTP 메서드와 경로를 추출하는 메서드입니다.
   * 클래스 레벨의 RequestMapping과 메서드 레벨의 RequestMapping을 결합하여
   * 최종적인 HTTP 메서드와 경로를 반환합니다.
   */
  private HttpOperation extractHttpOperation(HandlerMethod handlerMethod) {
    RequestMapping classMapping = handlerMethod.getBeanType().getAnnotation(RequestMapping.class);

    GetMapping getMapping = handlerMethod.getMethodAnnotation(GetMapping.class);
    if (getMapping != null) {
      String path = extractPath(classMapping, getMapping.value());
      return new HttpOperation("GET", path);
    }

    PostMapping postMapping = handlerMethod.getMethodAnnotation(PostMapping.class);
    if (postMapping != null) {
      String path = extractPath(classMapping, postMapping.value());
      return new HttpOperation("POST", path);
    }

    PutMapping putMapping = handlerMethod.getMethodAnnotation(PutMapping.class);
    if (putMapping != null) {
      String path = extractPath(classMapping, putMapping.value());
      return new HttpOperation("PUT", path);
    }

    DeleteMapping deleteMapping = handlerMethod.getMethodAnnotation(DeleteMapping.class);
    if (deleteMapping != null) {
      String path = extractPath(classMapping, deleteMapping.value());
      return new HttpOperation("DELETE", path);
    }

    PatchMapping patchMapping = handlerMethod.getMethodAnnotation(PatchMapping.class);
    if (patchMapping != null) {
      String path = extractPath(classMapping, patchMapping.value());
      return new HttpOperation("PATCH", path);
    }

    return new HttpOperation("UNKNOWN", "");
  }

  /*
   * 클래스 경로와 메서드 경로를 결합하여 최종 경로를 생성합니다.
   * 이 메서드는 중복된 슬래시("//")를 제거하여 정확한 경로를 반환합니다.
   */
  private String extractPath(RequestMapping classMapping, String[] methodPaths) {
    String path = "";

    if (classMapping != null && classMapping.value().length > 0) {
      path = classMapping.value()[0];
    }

    if (methodPaths.length != 0) {
      path += "/" + methodPaths[0];
    }

    path =
        path.replaceAll("//+", "/")
            .replaceAll(
                "\\{[^}]+\\}",
                Matcher.quoteReplacement(
                    "123e4567-e89b-12d3-a456-426614174000")); // {id} 변수를 UUID 더미로 대체

    return path.startsWith("/") ? path : "/" + path;
  }

  /*
   * 주어진 HTTP 메서드와 경로가 화이트리스트에 포함되어 있는지 확인합니다.
   */
  private boolean isWhitelistPath(HttpOperation httpOperation) {
    String path = httpOperation.path();

    if (httpOperation.method().equals("GET")) {
      for (String pattern : whitelistGetPatterns) {
        if (path.matches(pattern)) {
          return true;
        }
      }
    } else if (httpOperation.method().equals("POST")) {
      for (String pattern : whitelistPostPatterns) {
        if (path.matches(pattern)) {
          return true;
        }
      }
    } else if (httpOperation.method().equals("PATCH")) {
      for (String pattern : whitelistPatchPatterns) {
        if (path.matches(pattern)) {
          return true;
        }
      }
    }
    return false;
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
