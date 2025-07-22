package com.ryc.api.v2.common.aop.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
 * 이 어노테이션은 메소드에 적용되어 clubId에 대한 유효성을 검사하는 역할을 합니다.
 */

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidClub {}
