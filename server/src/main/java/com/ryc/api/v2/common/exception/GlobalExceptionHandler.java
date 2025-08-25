package com.ryc.api.v2.common.exception;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import com.ryc.api.v2.common.exception.custom.*;
import com.ryc.api.v2.common.exception.event.ServerErrorEvent;
import com.ryc.api.v2.common.exception.response.ErrorResponse;

import lombok.RequiredArgsConstructor;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  private final ApplicationEventPublisher eventPublisher;

  @ExceptionHandler(NoPermissionException.class)
  public ResponseEntity<Object> handleNoPermissionException(
      NoPermissionException e, HttpServletRequest request) {
    ErrorCode errorCode = e.getErrorCode();
    return handleExceptionInternal(errorCode, request);
  }

  @ExceptionHandler(ClubException.class)
  public ResponseEntity<Object> handleClubException(ClubException e, HttpServletRequest request) {
    ErrorCode errorCode = e.getErrorCode();
    return handleExceptionInternal(errorCode, request);
  }

  @ExceptionHandler(InterviewException.class)
  public ResponseEntity<Object> handleInterviewException(
      InterviewException e, HttpServletRequest request) {
    ErrorCode errorCode = e.getErrorCode();
    return handleExceptionInternal(errorCode, request);
  }

  // DataIntegrityViolationException은 JPA에서 중복된 데이터 삽입 시 발생하는 예외
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Object> handleDataIntegrityViolationException(
      DataIntegrityViolationException e, HttpServletRequest request) {
    ErrorCode errorCode = CommonErrorCode.DUPLICATE_RESOURCE;
    return handleExceptionInternal(errorCode, e.getMessage(), request);
  }

  @ExceptionHandler(BusinessRuleException.class)
  public ResponseEntity<Object> handleBusinessRuleException(BusinessRuleException e) {
    ErrorCode errorCode = e.getErrorCode();

    ErrorResponse errorResponse =
        ErrorResponse.builder().code(errorCode.name()).message(e.getFormattedMessage()).build();

    return ResponseEntity.status(errorCode.getHttpStatus()).body(errorResponse);
  }

  // EmptyResultDataAccessException은 JPA에서 존재하지 않는 데이터를 삭제하려고 할 때 발생하는 예외
  @ExceptionHandler(EmptyResultDataAccessException.class)
  public ResponseEntity<Object> handleEmptyResult(
      EmptyResultDataAccessException e, HttpServletRequest request) {
    ErrorCode errorCode = CommonErrorCode.RESOURCE_NOT_FOUND;
    return handleExceptionInternal(errorCode, e.getMessage(), request);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<Object> handleNoSuchElementException(
      NoSuchElementException e, HttpServletRequest request) {
    ErrorCode errorCode = CommonErrorCode.RESOURCE_NOT_FOUND;
    return handleExceptionInternal(errorCode, e.getMessage(), request);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgumentException(
      IllegalArgumentException e, HttpServletRequest request) {
    ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
    return handleExceptionInternal(errorCode, e.getMessage(), request);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Object> handleConstraintViolationException(
      ConstraintViolationException e, HttpServletRequest request) {
    ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
    return handleExceptionInternal(errorCode, e.getMessage(), request);
  }

  @ExceptionHandler(InvalidFormatException.class)
  public ResponseEntity<Object> handleInvalidFormatException(
      InvalidFormatException e, HttpServletRequest request) {
    ErrorCode errorCode = e.getErrorCode();
    return handleExceptionInternal(errorCode, request);
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
  public ResponseEntity<Object> handleAllExceptions(Exception e, HttpServletRequest request) {
    ErrorCode errorCode = CommonErrorCode.INTERNAL_SERVER_ERROR;
    return handleExceptionInternal(errorCode, e.getMessage(), request);
  }

  // handleExceptionInternal Method
  private ResponseEntity<Object> handleExceptionInternal(
      ErrorCode errorCode, HttpServletRequest request) {

    if (errorCode.getHttpStatus() == HttpStatus.INTERNAL_SERVER_ERROR) {
      eventPublisher.publishEvent(
          new ServerErrorEvent(request.getRequestURI(), errorCode.getMessage()));
    }
    return ResponseEntity.status(errorCode.getHttpStatus()).body(makeErrorResponse(errorCode));
  }

  private ResponseEntity<Object> handleExceptionInternal(
      ErrorCode errorCode, String message, HttpServletRequest request) {

    if (errorCode.getHttpStatus() == HttpStatus.INTERNAL_SERVER_ERROR) {
      eventPublisher.publishEvent(new ServerErrorEvent(request.getRequestURI(), message));
    }
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
