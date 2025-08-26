package com.ryc.api.v2.common.validator.request;

import com.ryc.api.v2.common.validator.request.annotation.UserName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class UserNameValidator implements ConstraintValidator<UserName, String> {
    private static final Pattern NAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z][가-힣a-zA-Z0-9\\s._-]*$");
    private static final int MIN_NAME_LENGTH = 2;
    private static final int MAX_NAME_LENGTH = 30;

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if (name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH) {
            setErrorMessage(context,"이름은 2자 이상 30자 이하여야 합니다.");
            return false;
        }
        if (!NAME_PATTERN.matcher(name).matches()) {
            setErrorMessage(context,"관리자 이름은 한글, 영문, 숫자, 공백, 점, 밑줄, 하이픈만 포함할 수 있으며 문자로 시작해야 합니다.");
            return false;
        }

        return true;
    }

    /** 커스텀 오류 메시지를 설정하는 헬퍼 메서드 */
    private void setErrorMessage(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}