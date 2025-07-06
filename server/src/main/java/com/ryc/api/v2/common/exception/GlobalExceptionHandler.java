package com.ryc.api.v2.common.exception;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.ErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;
import com.ryc.api.v2.common.exception.custom.NoPermissionException;
import com.ryc.api.v2.common.exception.response.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  @ExceptionHandler({NoPermissionException.class, ClubException.class})
  public ResponseEntity<Object> handleNoPermissionException(RuntimeException e) {
    ErrorCode errorCode;

    if (e instanceof NoPermissionException) {
      errorCode = ((NoPermissionException) e).getErrorCode();
    } else if (e instanceof ClubException) {
      errorCode = ((ClubException) e).getErrorCode();
    } else {
      errorCode = CommonErrorCode.INTERNAL_SERVER_ERROR;
    }
    return handleExceptionInternal(errorCode);
  }

  // DataIntegrityViolationException은 JPA에서 중복된 데이터 삽입 시 발생하는 예외
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Object> handleDataIntegrityViolationException(
      DataIntegrityViolationException e) {
    ErrorCode errorCode = CommonErrorCode.DUPLICATE_RESOURCE;
    return handleExceptionInternal(errorCode);
  }

  // EmptyResultDataAccessException은 JPA에서 존재하지 않는 데이터를 삭제하려고 할 때 발생하는 예외
  @ExceptionHandler(EmptyResultDataAccessException.class)
  public ResponseEntity<Object> handleEmptyResult(EmptyResultDataAccessException e) {
    ErrorCode errorCode = CommonErrorCode.RESOURCE_NOT_FOUND;
    return handleExceptionInternal(errorCode);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<Object> handleIllegalArgumentException(NoSuchElementException e) {
    ErrorCode errorCode = CommonErrorCode.RESOURCE_NOT_FOUND;
    return handleExceptionInternal(errorCode, e.getMessage());
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException e) {
    ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
    return handleExceptionInternal(errorCode, e.getMessage());
  }

  @Override
  public ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException e,
      HttpHeaders headers,
      HttpStatusCode statusCode,
      WebRequest request) {
    ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
    return handleExceptionInternal(e, errorCode);
  }

  @ExceptionHandler({Exception.class})
  public ResponseEntity<Object> handleAllExceptions(Exception e) {
    ErrorCode errorCode = CommonErrorCode.INTERNAL_SERVER_ERROR;
    return handleExceptionInternal(errorCode, e.getMessage());
  }

  // handleExceptionInternal Method
  private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode) {
    return ResponseEntity.status(errorCode.getHttpStatus()).body(makeErrorResponse(errorCode));
  }

  private ResponseEntity<Object> handleExceptionInternal(ErrorCode errorCode, String message) {
    return ResponseEntity.status(errorCode.getHttpStatus())
        .body(makeErrorResponse(errorCode, message));
  }

  private ResponseEntity<Object> handleExceptionInternal(BindException e, ErrorCode errorCode) {
    return ResponseEntity.status(errorCode.getHttpStatus()).body(makeErrorResponse(e, errorCode));
  }

  // makeErrorResponse Method
  private ErrorResponse makeErrorResponse(ErrorCode errorCode) {
    return ErrorResponse.builder().code(errorCode.name()).message(errorCode.getMessage()).build();
  }

  private ErrorResponse makeErrorResponse(ErrorCode errorCode, String message) {
    return ErrorResponse.builder().code(errorCode.name()).message(message).build();
  }

  private ErrorResponse makeErrorResponse(BindException e, ErrorCode errorCode) {
    List<ErrorResponse.ValidationError> validationErrorList =
        e.getBindingResult().getFieldErrors().stream()
            .map(ErrorResponse.ValidationError::of)
            .collect(Collectors.toList());

    return ErrorResponse.builder()
        .code(errorCode.name())
        .message(errorCode.getMessage())
        .errors(validationErrorList)
        .build();
  }
}
