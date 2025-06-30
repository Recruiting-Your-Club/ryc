package com.ryc.api.v2.common.aop.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.ryc.api.v2.role.domain.Role;

/*
 * 이 어노테이션은 메소드에 적용되어 해당 메소드가 특정 역할을 가진 사용자만 접근할 수 있도록 합니다.
 * 메서드의 파라미터로 CustomUserDetail과 clubId를 받아 해당 사용자가 지정된 역할을 가지고 있는지 검증합니다.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface HasRole {
  Role value();
}
