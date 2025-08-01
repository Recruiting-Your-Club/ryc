package com.ryc.api.v2.common.exception.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.ryc.api.v2.common.exception.code.ErrorCode;

/*
 * 이 어노테이션은 API 메소드에 적용되어,
 * 해당 메소드가 반환하는 에러 코드의 예시를 swagger에서 명시합니다.
 * 따라서 해당 어노테이션은 API 문서화에 사용됩니다.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiErrorCodeExample {

  Class<? extends ErrorCode> value(); // 에러 코드 클래스

  String[] include() default {}; // 포함할 에러 코드 enum 이름
}
