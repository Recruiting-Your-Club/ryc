package com.ryc.api.v1.common.exception.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PermisssionErrorCode implements ErrorCode{
    FORBIDDEN_NOT_CLUB_PRESIDENT(HttpStatus.FORBIDDEN, "You are not the club president. Access forbidden."),
    FORBIDDEN_NOT_CLUB_MEMBER(HttpStatus.FORBIDDEN, "You are not the club member. Access forbidden.");

    private final HttpStatus httpStatus;
    private final String message;
}
