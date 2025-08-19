package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum InvalidFormatErrorCode implements ErrorCode {
  /** 관리자(Admin) 에러 코드 */
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

  // Admin 역할
  ADMIN_DEFAULT_ROLE_NULL(HttpStatus.BAD_REQUEST, "관리자 기본 역할은 null일 수 없습니다."),
  ADMIN_IS_DELETED_NULL(HttpStatus.BAD_REQUEST, "관리자 삭제 여부는 null일 수 없습니다."),

  /** 공고(Announcement) 에러 코드 */
  // Announcement ID
  ANNOUNCEMENT_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "공고 ID는 null 혹은 empty일 수 없습니다."),
  ANNOUNCEMENT_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "공고 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Club ID
  ANNOUNCEMENT_CLUB_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "클럽 ID는 null 혹은 empty일 수 없습니다."),
  ANNOUNCEMENT_INVALID_CLUB_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "클럽 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Announcement 제목
  ANNOUNCEMENT_TITLE_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "공고 제목은 null 혹은 empty일 수 없습니다."),
  ANNOUNCEMENT_INVALID_TITLE_LENGTH(HttpStatus.BAD_REQUEST, "공고 제목은 2자 이상 100자 이하여야 합니다."),

  // Announcement 모집인원
  ANNOUNCEMENT_NUMBER_OF_PEOPLE_EMPTY(HttpStatus.BAD_REQUEST, "모집 인원은 empty일 수 없습니다."),
  ANNOUNCEMENT_NUMBER_OF_PEOPLE_TOO_LONG(HttpStatus.BAD_REQUEST, "모집 인원은 50자를 초과할 수 없습니다."),

  // Announcement 상세 설명
  ANNOUNCEMENT_DETAIL_DESCRIPTION_EMPTY(HttpStatus.BAD_REQUEST, "공고 상세 설명은 empty일 수 없습니다."),
  ANNOUNCEMENT_DETAIL_DESCRIPTION_TOO_LONG(HttpStatus.BAD_REQUEST, "공고 상세 설명은 10000자를 초과할 수 없습니다."),
  ANNOUNCEMENT_SUMMARY_DESCRIPTION_EMPTY(HttpStatus.BAD_REQUEST, "공고 요약 설명은 empty일 수 없습니다."),
  ANNOUNCEMENT_SUMMARY_DESCRIPTION_TOO_LONG(HttpStatus.BAD_REQUEST, "공고 요약 설명은 300자를 초과할 수 없습니다."),

  // Announcement 모집 대상
  ANNOUNCEMENT_TARGET_EMPTY(HttpStatus.BAD_REQUEST, "모집 대상은 empty일 수 없습니다."),
  ANNOUNCEMENT_TARGET_TOO_LONG(HttpStatus.BAD_REQUEST, "모집 대상은 50자를 초과할 수 없습니다."),

  // Announcement 모집 분야
  ANNOUNCEMENT_FIELD_EMPTY(HttpStatus.BAD_REQUEST, "모집 분야는 empty일 수 없습니다."),
  ANNOUNCEMENT_FIELD_TOO_LONG(HttpStatus.BAD_REQUEST, "모집 분야는 50자를 초과할 수 없습니다."),

  // Announcement 활동기간
  ANNOUNCEMENT_ACTIVITY_PERIOD_EMPTY(HttpStatus.BAD_REQUEST, "활동 기간은 empty일 수 없습니다."),
  ANNOUNCEMENT_ACTIVITY_PERIOD_TOO_LONG(HttpStatus.BAD_REQUEST, "활동 기간은 100자를 초과할 수 없습니다."),

  // Announcement 외부 참조 도메인/상태
  ANNOUNCEMENT_TAGS_NULL(HttpStatus.BAD_REQUEST, "태그 리스트는 null일 수 없습니다."),
  ANNOUNCEMENT_STATUS_NULL(HttpStatus.BAD_REQUEST, "공고 상태는 null일 수 없습니다."),
  ANNOUNCEMENT_TYPE_NULL(HttpStatus.BAD_REQUEST, "공고 유형은 null일 수 없습니다."),
  ANNOUNCEMENT_HAS_INTERVIEW_NULL(HttpStatus.BAD_REQUEST, "면접 여부는 null일 수 없습니다."),
  ANNOUNCEMENT_PERIOD_INFO_NULL(HttpStatus.BAD_REQUEST, "공고 기간 정보는 null일 수 없습니다."),
  ANNOUNCEMENT_APPLICATION_FORM_NULL(HttpStatus.BAD_REQUEST, "지원서 양식은 null일 수 없습니다."),
  ANNOUNCEMENT_IS_DELETED_NULL(HttpStatus.BAD_REQUEST, "공고 삭제 여부는 null일 수 없습니다."),
  ANNOUNCEMENT_CREATED_AT_NULL(HttpStatus.BAD_REQUEST, "공고 생성일은 null일 수 없습니다."),
  ANNOUNCEMENT_UPDATED_AT_NULL(HttpStatus.BAD_REQUEST, "공고 수정일은 null일 수 없습니다."),

  /** 기간(Period) 에러 코드 */
  PERIOD_START_DATE_NULL(HttpStatus.BAD_REQUEST, "기간의 시작 시간은 null일 수 없습니다."),
  PERIOD_END_DATE_NULL(HttpStatus.BAD_REQUEST, "기간의 종료 시간은 null일 수 없습니다."),
  PERIOD_INVALID_RANGE(HttpStatus.BAD_REQUEST, "기간의 시작 시간은 종료 시간보다 더 빨라야 합니다."),

  /** 공고 기간 정보(AnnouncementPeriodInfo) 에러코드 */
  APPLICATION_PERIOD_NULL(HttpStatus.BAD_REQUEST, "지원서 작성 기간은 null일 수 없습니다."),

  /** 공고 태그(Tag) 에러코드 */
  ANNOUNCEMENT_TAG_LABEL_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "공고 태그 라벨은 null 혹은 empty일 수 없습니다."),
  ANNOUNCEMENT_TAG_LABEL_TOO_LONG(HttpStatus.BAD_REQUEST, "공고 태그 라벨은 20자를 초과할 수 없습니다."),

  /** 지원자(Applicant) 에러 코드 */
  // Applicant ID
  APPLICANT_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원자 ID는 null 혹은 empty일 수 없습니다."),
  APPLICANT_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "지원자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Applicant 공고 ID
  APPLICANT_ANNOUNCEMENT_ID_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "지원자의 공고 ID는 null 혹은 empty일 수 없습니다."),
  APPLICANT_INVALID_ANNOUNCEMENT_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "지원자의 공고 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Applicant Domain Email (separate from Personal Info Email)
  APPLICANT_EMAIL_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원자의 이메일은 null 혹은 empty일 수 없습니다."),
  APPLICANT_EMAIL_TOO_LONG(HttpStatus.BAD_REQUEST, "지원자 도메인 이메일은 320자를 초과할 수 없습니다."),
  APPLICANT_EMAIL_MISSING_AT_SYMBOL(HttpStatus.BAD_REQUEST, "지원자 도메인 이메일에 @ 기호가 없습니다."),
  APPLICANT_EMAIL_LOCAL_PART_INVALID_LENGTH(
      HttpStatus.BAD_REQUEST, "지원자의 이메일 로컬 부분은 1자 이상 64자 이하여야 합니다."),
  APPLICANT_EMAIL_DOMAIN_PART_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "지원자의 이메일 도메인 부분은 null 혹은 empty일 수 없습니다."),
  APPLICANT_EMAIL_DOMAIN_PART_TOO_LONG(
      HttpStatus.BAD_REQUEST, "지원자의 이메일 도메인 부분은 253자를 초과할 수 없습니다."),
  APPLICANT_INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "지원자의 이메일이 RFC 5322 표준에 맞지 않습니다."),

  // Applicant Domain Name (separate from Personal Info Name)
  APPLICANT_NAME_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원자 이름은 null 혹은 empty일 수 없습니다."),
  APPLICANT_INVALID_NAME_LENGTH(HttpStatus.BAD_REQUEST, "지원자 이름은 2자 이상 30자 이하여야 합니다."),
  APPLICANT_INVALID_NAME_FORMAT(
      HttpStatus.BAD_REQUEST, "지원자 도메인 이름은 한글, 영문, 숫자, 공백, 점, 밑줄, 하이픈만 포함할 수 있으며 문자로 시작해야 합니다."),

  // Applicant Status
  APPLICANT_STATUS_NULL(HttpStatus.BAD_REQUEST, "지원자 상태는 null일 수 없습니다."),

  // Applicant IsDeleted
  APPLICANT_IS_DELETED_NULL(HttpStatus.BAD_REQUEST, "지원자 삭제 여부는 null일 수 없습니다."),

  // Applicant Personal Infos List
  APPLICANT_PERSONAL_INFOS_NULL(HttpStatus.BAD_REQUEST, "지원자 개인정보 리스트는 null일 수 없습니다.");

  private final HttpStatus httpStatus;
  private final String message;
}
