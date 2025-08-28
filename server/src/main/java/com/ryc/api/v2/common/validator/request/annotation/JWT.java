package com.ryc.api.v2.common.validator.request.annotation;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import com.ryc.api.v2.common.validator.request.JWTValidator;
import com.ryc.api.v2.common.validator.request.annotation.JWT.List;

@Documented
@Constraint(validatedBy = JWTValidator.class)
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Repeatable(List.class)
public @interface JWT {
  String message() default "잘못된 JWT 형식입니다.";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  @Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
  @Retention(RUNTIME)
  @Documented
  public @interface List {
    JWT[] value();
  }
}
