package com.ryc.api.v2.application.service;

public class IdempotencyKeyAlreadyExistsException extends RuntimeException {

  public IdempotencyKeyAlreadyExistsException(String message, Throwable cause) {
    super(message, cause);
  }
}
