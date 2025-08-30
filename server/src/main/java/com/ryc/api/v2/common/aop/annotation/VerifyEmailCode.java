package com.ryc.api.v2.common.aop.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
 * 이메일 인증 코드 검증 어노테이션
 * - 컨트롤러 메서드에 적용하여 이메일 인증 코드 검증 기능을 추가
 * - 메서드 실행 전 이메일 인증 코드의 유효성을 검사
 * - 유효하지 않은 경우 예외를 발생시켜 메서드 실행을 방지
 * - 유효한 경우 메서드가 정상적으로 실행되도록 허용
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface VerifyEmailCode {}
