package com.ryc.api.v2.s3.common.exception.code;

import com.ryc.api.v2.common.exception.code.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum S3ErrorCode implements ErrorCode {
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "%s is invalid file type. (CLUB_PROFILE, ANNOUNCEMENT_IMAGE, APPLICATION_ATTACHMENT are allowed)"),
    REQUIRED_CONTENT_TYPE(HttpStatus.BAD_REQUEST, "Content-Type is required"),
    INVALID_CONTENT_TYPE(HttpStatus.BAD_REQUEST, "%s is invalid content type in %s. (%s are allowed)."),
    ;
    private final HttpStatus httpStatus;
    private final String message;

}
