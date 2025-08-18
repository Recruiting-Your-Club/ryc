package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum InvalidFormatErrorCode implements ErrorCode {
  /** 관리자(Admin) 전용 에러 코드 */
  // Admin ID
  ADMIN_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "관리자 ID는 null 혹은 empty일 수 없습니다."),
  ADMIN_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "관리자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Admin 이름
  ADMIN_NAME_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "관리자 이름은 null 혹은 empty일 수 없습니다."),
  ADMIN_INVALID_NAME_LENGTH(HttpStatus.BAD_REQUEST, "관리자 이름은 2자 이상 30자 이하여야 합니다."),
  ADMIN_INVALID_NAME_FORMAT(
      HttpStatus.BAD_REQUEST, "관리자 이름은 한글, 영문, 숫자, 공백, 점, 밑줄, 하이픈만 포함할 수 있으며 문자로 시작해야 합니다."),

  // Admin 이메일
  ADMIN_EMAIL_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "관리자 이메일은 null 혹은 empty일 수 없습니다."),
  ADMIN_EMAIL_TOO_LONG(HttpStatus.BAD_REQUEST, "관리자 이메일은 320자를 초과할 수 없습니다."),
  ADMIN_EMAIL_MISSING_AT_SYMBOL(HttpStatus.BAD_REQUEST, "관리자 이메일에 @ 기호가 없습니다."),
  ADMIN_EMAIL_LOCAL_PART_INVALID_LENGTH(
      HttpStatus.BAD_REQUEST, "관리자 이메일 로컬 부분은 1자 이상 64자 이하여야 합니다."),
  ADMIN_EMAIL_DOMAIN_PART_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "관리자 이메일 도메인 부분은 null 혹은 empty일 수 없습니다."),
  ADMIN_EMAIL_DOMAIN_PART_TOO_LONG(HttpStatus.BAD_REQUEST, "관리자 이메일 도메인 부분은 253자를 초과할 수 없습니다."),
  ADMIN_INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "관리자 이메일이 RFC 5322 표준에 맞지 않습니다."),

  // Admin 비밀번호
  ADMIN_PASSWORD_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "관리자 비밀번호는 null 혹은 empty일 수 없습니다."),
  ADMIN_INVALID_BCRYPT_PASSWORD_FORMAT(
      HttpStatus.BAD_REQUEST, "관리자 비밀번호는 유효한 BCrypt 해시 형식이어야 합니다."),
  ADMIN_INVALID_BCRYPT_PASSWORD_LENGTH(HttpStatus.BAD_REQUEST, "관리자 BCrypt 해시는 정확히 60자여야 합니다."),

  // Admin 역할 및 상태
  ADMIN_DEFAULT_ROLE_NULL(HttpStatus.BAD_REQUEST, "관리자 기본 역할은 null일 수 없습니다."),
  ADMIN_IS_DELETED_NULL(HttpStatus.BAD_REQUEST, "관리자 삭제 여부는 null일 수 없습니다.");

  private final HttpStatus httpStatus;
  private final String message;
}
