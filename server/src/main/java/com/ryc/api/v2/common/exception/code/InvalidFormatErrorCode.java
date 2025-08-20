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
  APPLICANT_PERSONAL_INFOS_NULL(HttpStatus.BAD_REQUEST, "지원자 개인정보 리스트는 null일 수 없습니다."),

  /** 개인정보(PersonalInfo) 에러 코드 */
  // Personal Info ID
  PERSONAL_INFO_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "개인정보 ID는 null 혹은 empty일 수 없습니다."),
  PERSONAL_INFO_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "개인정보 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Personal Info Question Type
  PERSONAL_INFO_QUESTION_TYPE_NULL(HttpStatus.BAD_REQUEST, "개인정보 질문 유형은 null일 수 없습니다."),

  // Personal Info Value
  PERSONAL_INFO_VALUE_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "개인정보 값은 null 혹은 empty일 수 없습니다."),

  // Personal Info Student ID
  PERSONAL_INFO_INVALID_STUDENT_ID_LENGTH(HttpStatus.BAD_REQUEST, "지원자 학번은 정확히 8자리여야 합니다."),
  PERSONAL_INFO_INVALID_STUDENT_ID_FORMAT(HttpStatus.BAD_REQUEST, "지원자 학번은 숫자로만 구성되어야 합니다."),

  // Personal Info Phone Number
  PERSONAL_INFO_INVALID_PHONE_NUMBER_FORMAT(
      HttpStatus.BAD_REQUEST, "지원자 전화번호는 01X-XXXX-XXXX 형식이어야 합니다."),

  // Personal Info Profile Image
  PERSONAL_INFO_PROFILE_IMAGE_METADATA_ID_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "지원자 프로필 이미지 메타데이터 ID는 null 혹은 empty일 수 없습니다."),
  PERSONAL_INFO_INVALID_PROFILE_IMAGE_METADATA_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "지원자 프로필 이미지 메타데이터 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Personal Info Name
  PERSONAL_INFO_NAME_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원자 개인정보 이름은 null 혹은 empty일 수 없습니다."),
  PERSONAL_INFO_INVALID_NAME_LENGTH(HttpStatus.BAD_REQUEST, "지원자 개인정보 이름은 2자 이상 30자 이하여야 합니다."),
  PERSONAL_INFO_INVALID_NAME_FORMAT(
      HttpStatus.BAD_REQUEST, "지원자 개인정보 이름은 한글, 영문, 숫자, 공백, 점, 밑줄, 하이픈만 포함할 수 있으며 문자로 시작해야 합니다."),

  // Personal Info Email
  PERSONAL_INFO_EMAIL_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일은 null 혹은 empty일 수 없습니다."),
  PERSONAL_INFO_EMAIL_TOO_LONG(HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일은 320자를 초과할 수 없습니다."),
  PERSONAL_INFO_EMAIL_MISSING_AT_SYMBOL(HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일에 @ 기호가 없습니다."),
  PERSONAL_INFO_EMAIL_LOCAL_PART_INVALID_LENGTH(
      HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일 로컬 부분은 1자 이상 64자 이하여야 합니다."),
  PERSONAL_INFO_EMAIL_DOMAIN_PART_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일 도메인 부분은 null 혹은 empty일 수 없습니다."),
  PERSONAL_INFO_EMAIL_DOMAIN_PART_TOO_LONG(
      HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일 도메인 부분은 253자를 초과할 수 없습니다."),
  PERSONAL_INFO_INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "지원자 개인정보 이메일이 RFC 5322 표준에 맞지 않습니다."),

  /** 답변(Answer) 에러 코드 */
  // Answer ID
  ANSWER_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "답변 ID는 null 혹은 empty일 수 없습니다."),
  ANSWER_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "답변 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Answer Question ID
  ANSWER_QUESTION_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "답변의 질문 ID는 null 혹은 empty일 수 없습니다."),
  ANSWER_INVALID_QUESTION_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "답변의 질문 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Answer Text Answer
  ANSWER_TEXT_ANSWER_EMPTY(HttpStatus.BAD_REQUEST, "텍스트 답변은 empty일 수 없습니다."),
  ANSWER_TEXT_ANSWER_TOO_LONG(HttpStatus.BAD_REQUEST, "답변 텍스트는 5000자를 초과할 수 없습니다."),

  // Answer Choices
  ANSWER_CHOICES_NULL(HttpStatus.BAD_REQUEST, "답변 선택 리스트는 null일 수 없습니다."),

  // Answer File Metadata ID
  ANSWER_INVALID_FILE_METADATA_ID_EMPTY(HttpStatus.BAD_REQUEST, "답변 파일 메타데이터 ID는 empty일 수 없습니다."),
  ANSWER_INVALID_FILE_METADATA_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "답변 파일 메타데이터 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  /** 답변선택(AnswerChoice) 에러 코드 */
  // AnswerChoice ID
  ANSWER_CHOICE_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "객관식 답변 ID는 null 혹은 empty일 수 없습니다."),
  ANSWER_CHOICE_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "객관식 답변 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // AnswerChoice Option ID
  ANSWER_CHOICE_OPTION_ID_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "객관식 답변 값인 선지 ID는 null 혹은 empty일 수 없습니다."),
  ANSWER_CHOICE_INVALID_OPTION_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "객관식 답변 값인 선지 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  /** 지원서(Application) 에러 코드 */
  // Application ID
  APPLICATION_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원서 ID는 null 혹은 empty일 수 없습니다."),
  APPLICATION_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "지원서 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Application Applicant ID
  APPLICATION_APPLICANT_ID_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "지원서의 지원자 ID는 null 혹은 empty일 수 없습니다."),
  APPLICATION_INVALID_APPLICANT_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "지원서의 지원자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Application Answers
  APPLICATION_ANSWERS_NULL(HttpStatus.BAD_REQUEST, "지원서 답변 리스트는 null일 수 없습니다."),

  // Application CreatedAt
  APPLICATION_CREATED_AT_NULL(HttpStatus.BAD_REQUEST, "지원서 생성일은 null일 수 없습니다."),

  /** 지원서양식(ApplicationForm) 에러 코드 */
  // ApplicationForm ID
  APPLICATION_FORM_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "지원서 양식 ID는 null 혹은 empty일 수 없습니다."),
  APPLICATION_FORM_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "지원서 양식 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // ApplicationForm Questions
  APPLICATION_FORM_APPLICATION_QUESTIONS_NULL(HttpStatus.BAD_REQUEST, "지원서 질문 리스트는 null일 수 없습니다."),
  APPLICATION_FORM_PERSONAL_INFO_QUESTION_TYPES_NULL(
      HttpStatus.BAD_REQUEST, "개인정보 질문 타입 리스트는 null일 수 없습니다."),
  APPLICATION_FORM_PRE_QUESTIONS_NULL(HttpStatus.BAD_REQUEST, "사전 질문 리스트는 null일 수 없습니다."),

  /** 질문(Question) 에러 코드 */
  // Question ID
  QUESTION_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "질문 ID는 null 혹은 empty일 수 없습니다."),
  QUESTION_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "질문 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Question Label
  QUESTION_LABEL_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "질문은 null 혹은 empty일 수 없습니다."),
  QUESTION_LABEL_TOO_LONG(HttpStatus.BAD_REQUEST, "질문은 500자를 초과할 수 없습니다."),

  // Question IsRequired
  QUESTION_IS_REQUIRED_NULL(HttpStatus.BAD_REQUEST, "질문 IsRequired는 null일 수 없습니다."),

  // Question Options
  QUESTION_OPTIONS_NULL(HttpStatus.BAD_REQUEST, "객관식 질문 선지 리스트는 null일 수 없습니다. (빈리스트는 허용)"),

  // Question Type
  QUESTION_TYPE_NULL(HttpStatus.BAD_REQUEST, "질문 타입은 null일 수 없습니다."),

  // Question Category
  QUESTION_CATEGORY_NULL(HttpStatus.BAD_REQUEST, "질문 카테고리(사전질문/질문)는 null일 수 없습니다."),

  /** 질문옵션(QuestionOption) 에러 코드 */
  // QuestionOption ID
  QUESTION_OPTION_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "질문 선지 ID는 null 혹은 empty일 수 없습니다."),
  QUESTION_OPTION_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "질문 선지 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // QuestionOption Option
  QUESTION_OPTION_OPTION_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "질문 선지는 null 혹은 empty일 수 없습니다."),
  QUESTION_OPTION_OPTION_TOO_LONG(HttpStatus.BAD_REQUEST, "질문 선지는 200자를 초과할 수 없습니다."),

  /** 리프레시 토큰(RefreshToken) 에러 코드 */
  // RefreshToken ID
  REFRESH_TOKEN_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "리프레시 토큰 ID는 null 혹은 empty일 수 없습니다."),
  REFRESH_TOKEN_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "리프레시 토큰 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // RefreshToken Admin ID
  REFRESH_TOKEN_ADMIN_ID_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "리프레시 토큰 도메인의 관리자 ID는 null 혹은 empty일 수 없습니다."),
  REFRESH_TOKEN_INVALID_ADMIN_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "리프레시 토큰 도메인의 관리자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // RefreshToken Token
  REFRESH_TOKEN_TOKEN_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "리프래시 토큰 값은 null 혹은 empty일 수 없습니다."),
  REFRESH_TOKEN_INVALID_LENGTH(HttpStatus.BAD_REQUEST, "리프레시 토큰은 100자 이상 1000자 이하여야 합니다."),
  REFRESH_TOKEN_MISSING_DOT_SYMBOL(HttpStatus.BAD_REQUEST, "리프레시 토큰에 .(dot) 기호가 없습니다."),
  REFRESH_TOKEN_INVALID_PART_COUNT(
      HttpStatus.BAD_REQUEST, "리프레시 토큰은 .(dot) 기호를 기준으로, 3파트(헤더.페이로드.서명)로 구성되어야 합니다."),
  REFRESH_TOKEN_INVALID_PART_FORMAT(HttpStatus.BAD_REQUEST, "리프레시 토큰의 각 파트는 Base64Url 포멧이어야 합니다."),

  // RefreshToken Expiration Time
  REFRESH_TOKEN_EXPIRATION_TIME_NULL(HttpStatus.BAD_REQUEST, "리프레시 토큰 만료 시간은 null일 수 없습니다."),

  /** 동아리(Club) 에러 코드 */
  // Club ID
  CLUB_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 ID는 null 혹은 empty일 수 없습니다."),
  CLUB_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "동아리 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Club Name
  CLUB_NAME_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 이름은 null 혹은 empty일 수 없습니다."),
  CLUB_INVALID_NAME_LENGTH(HttpStatus.BAD_REQUEST, "동아리 이름은 2자 이상 50자 이하여야 합니다."),

  // Club Short Description
  CLUB_SHORT_DESCRIPTION_EMPTY(HttpStatus.BAD_REQUEST, "동아리 간단 설명은 empty일 수 없습니다."),
  CLUB_SHORT_DESCRIPTION_TOO_LONG(HttpStatus.BAD_REQUEST, "동아리 간단 설명은 200자를 초과할 수 없습니다."),

  // Club Detail Description
  CLUB_DETAIL_DESCRIPTION_EMPTY(HttpStatus.BAD_REQUEST, "동아리 상세 설명은 empty일 수 없습니다."),
  CLUB_DETAIL_DESCRIPTION_TOO_LONG(HttpStatus.BAD_REQUEST, "동아리 상세 설명은 5000자를 초과할 수 없습니다."),

  // Club Category
  CLUB_CATEGORY_NULL(HttpStatus.BAD_REQUEST, "동아리 카테고리는 null일 수 없습니다."),

  // Club Tags & Summaries
  CLUB_TAGS_NULL(HttpStatus.BAD_REQUEST, "동아리 태그 리스트는 null일 수 없습니다."),
  CLUB_SUMMARIES_NULL(HttpStatus.BAD_REQUEST, "동아리 요약 리스트는 null일 수 없습니다."),

  /** 동아리요약(ClubSummary) 에러 코드 */
  // ClubSummary ID
  CLUB_SUMMARY_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 요약 ID는 null 혹은 empty일 수 없습니다."),
  CLUB_SUMMARY_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "동아리 요약 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // ClubSummary Title
  CLUB_SUMMARY_TITLE_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 요약 제목은 null 혹은 empty일 수 없습니다."),
  CLUB_SUMMARY_TITLE_TOO_LONG(HttpStatus.BAD_REQUEST, "동아리 요약 제목은 20자를 초과할 수 없습니다."),

  // ClubSummary Content
  CLUB_SUMMARY_CONTENT_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 요약 내용은 null 혹은 empty일 수 없습니다."),
  CLUB_SUMMARY_CONTENT_TOO_LONG(HttpStatus.BAD_REQUEST, "동아리 요약 내용은 50자를 초과할 수 없습니다."),

  /** 동아리태그(ClubTag) 에러 코드 */
  // ClubTag ID
  CLUB_TAG_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 태그 ID는 null 혹은 empty일 수 없습니다."),
  CLUB_TAG_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "동아리 태그 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // ClubTag Name
  CLUB_TAG_NAME_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "동아리 태그 이름은 null 혹은 empty일 수 없습니다."),
  CLUB_TAG_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, "동아리 태그 이름은 30자를 초과할 수 없습니다."),

  /** 평가(Evaluation) 에러 코드 */
  // Evaluation ID
  EVALUATION_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "평가 ID는 null 혹은 empty일 수 없습니다."),
  EVALUATION_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "평가 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Evaluation Evaluator ID
  EVALUATION_EVALUATOR_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "평가자 ID는 null 혹은 empty일 수 없습니다."),
  EVALUATION_INVALID_EVALUATOR_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "평가자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Evaluation Evaluatee ID
  EVALUATION_EVALUATEE_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "피평가자 ID는 null 혹은 empty일 수 없습니다."),
  EVALUATION_INVALID_EVALUATEE_ID_FORMAT(
      HttpStatus.BAD_REQUEST,
      "피평가자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Evaluation Score
  EVALUATION_SCORE_NULL(HttpStatus.BAD_REQUEST, "평가 점수는 null일 수 없습니다."),
  EVALUATION_SCORE_OUT_OF_RANGE(HttpStatus.BAD_REQUEST, "평가 점수는 0.0 이상 5.0 이하여야 합니다."),
  EVALUATION_SCORE_INVALID_SCALE(HttpStatus.BAD_REQUEST, "평가 점수는 소수점 첫째 자리까지만 허용됩니다."),

  // Evaluation Comment
  EVALUATION_COMMENT_EMPTY(HttpStatus.BAD_REQUEST, "평가 코멘트는 empty일 수 없습니다."),
  EVALUATION_COMMENT_TOO_LONG(HttpStatus.BAD_REQUEST, "평가 코멘트는 500자를 초과할 수 없습니다."),

  // Evaluation Type
  EVALUATION_TYPE_NULL(HttpStatus.BAD_REQUEST, "평가 타입은 null일 수 없습니다."),

  // Evaluation Deleted
  EVALUATION_DELETED_NULL(HttpStatus.BAD_REQUEST, "평가 삭제 여부는 null일 수 없습니다."),

  // Evaluation CreatedAt/UpdatedAt
  EVALUATION_CREATED_AT_NULL(HttpStatus.BAD_REQUEST, "평가 생성일은 null일 수 없습니다."),
  EVALUATION_UPDATED_AT_NULL(HttpStatus.BAD_REQUEST, "평가 수정일은 null일 수 없습니다."),

  /** 이메일(Email) 에러 코드 */
  // Email ID
  EMAIL_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "이메일 ID는 null 혹은 empty일 수 없습니다."),
  EMAIL_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "이메일 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Email Sender ID
  EMAIL_SENDER_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "이메일 발신자 ID는 null 혹은 empty일 수 없습니다."),
  EMAIL_INVALID_SENDER_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "이메일 발신자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Email Recipient
  EMAIL_RECIPIENT_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "이메일 수신자는 null 혹은 empty일 수 없습니다."),
  EMAIL_RECIPIENT_TOO_LONG(HttpStatus.BAD_REQUEST, "이메일 수신자는 320자를 초과할 수 없습니다."),
  EMAIL_RECIPIENT_MISSING_AT_SYMBOL(HttpStatus.BAD_REQUEST, "이메일 수신자에 @ 기호가 없습니다."),
  EMAIL_RECIPIENT_LOCAL_PART_INVALID_LENGTH(
      HttpStatus.BAD_REQUEST, "이메일 수신자 로컬 부분은 1자 이상 64자 이하여야 합니다."),
  EMAIL_RECIPIENT_DOMAIN_PART_NULL_OR_EMPTY(
      HttpStatus.BAD_REQUEST, "이메일 수신자 도메인 부분은 null 혹은 empty일 수 없습니다."),
  EMAIL_RECIPIENT_DOMAIN_PART_TOO_LONG(HttpStatus.BAD_REQUEST, "이메일 수신자 도메인 부분은 253자를 초과할 수 없습니다."),
  EMAIL_INVALID_RECIPIENT_FORMAT(HttpStatus.BAD_REQUEST, "이메일 수신자가 RFC 5322 표준에 맞지 않습니다."),

  // Email Subject
  EMAIL_SUBJECT_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "이메일 제목은 null 혹은 empty일 수 없습니다."),
  EMAIL_INVALID_SUBJECT_LENGTH(HttpStatus.BAD_REQUEST, "이메일 제목은 1자 이상 255자 이하여야 합니다."),

  // Email Content
  EMAIL_CONTENT_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "이메일 내용은 null 혹은 empty일 수 없습니다."),
  EMAIL_INVALID_CONTENT_LENGTH(HttpStatus.BAD_REQUEST, "이메일 내용은 1자 이상 10000자 이하여야 합니다."),

  // Email Announcement ID
  EMAIL_ANNOUNCEMENT_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "이메일 공고 ID는 null 혹은 empty일 수 없습니다."),
  EMAIL_INVALID_ANNOUNCEMENT_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "이메일 공고 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // Email Status
  EMAIL_STATUS_NULL(HttpStatus.BAD_REQUEST, "이메일 상태는 null일 수 없습니다."),

  // Email Retry Count
  EMAIL_RETRY_COUNT_NULL(HttpStatus.BAD_REQUEST, "이메일 재시도 횟수는 null일 수 없습니다."),
  EMAIL_INVALID_RETRY_COUNT_RANGE(HttpStatus.BAD_REQUEST, "이메일 재시도 횟수는 0 이상 10 이하여야 합니다."),

  /** 파일 메타데이터(FileMetaData) 에러 코드 */
  // FileMetaData ID
  FILE_METADATA_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "파일 메타데이터 ID는 null 혹은 empty일 수 없습니다."),
  FILE_METADATA_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "파일 메타데이터 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // FileMetaData File Path
  FILE_METADATA_FILE_PATH_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "파일 경로는 null 혹은 empty일 수 없습니다."),
  FILE_METADATA_INVALID_FILE_PATH_LENGTH(HttpStatus.BAD_REQUEST, "파일 경로는 1자 이상 2048자 이하여야 합니다."),

  // FileMetaData Original File Name
  FILE_METADATA_ORIGINAL_FILE_NAME_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "원본 파일명은 null 혹은 empty일 수 없습니다."),
  FILE_METADATA_INVALID_ORIGINAL_FILE_NAME_LENGTH(HttpStatus.BAD_REQUEST, "원본 파일명은 1자 이상 255자 이하여야 합니다."),

  // FileMetaData Content Type
  FILE_METADATA_CONTENT_TYPE_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "콘텐츠 타입은 null 혹은 empty일 수 없습니다."),
  FILE_METADATA_INVALID_CONTENT_TYPE_LENGTH(HttpStatus.BAD_REQUEST, "콘텐츠 타입은 1자 이상 255자 이하여야 합니다."),

  // FileMetaData File Size
  FILE_METADATA_FILE_SIZE_NULL(HttpStatus.BAD_REQUEST, "파일 크기는 null일 수 없습니다."),
  FILE_METADATA_INVALID_FILE_SIZE_RANGE(HttpStatus.BAD_REQUEST, "파일 크기는 0 이상 104857600 이하여야 합니다.(100MB)"),

  // FileMetaData Display Order
  FILE_METADATA_INVALID_DISPLAY_ORDER_RANGE(HttpStatus.BAD_REQUEST, "표시 순서는 0 이상 999 이하여야 합니다."),

  // FileMetaData File Domain Type
  FILE_METADATA_FILE_DOMAIN_TYPE_NULL(HttpStatus.BAD_REQUEST, "파일 도메인 타입은 null일 수 없습니다."),

  // FileMetaData Associated ID
  FILE_METADATA_ASSOCIATED_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "파일 연관 ID는 null 혹은 empty일 수 없습니다."),
  FILE_METADATA_INVALID_ASSOCIATED_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "파일 연관 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // FileMetaData Uploaded By User ID
  FILE_METADATA_INVALID_UPLOADED_BY_USER_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "파일을 업로드한 관리자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // FileMetaData Status
  FILE_METADATA_STATUS_NULL(HttpStatus.BAD_REQUEST, "파일 상태는 null일 수 없습니다."),

  /** 면접 예약(InterviewReservation) 에러 코드 */
  // InterviewReservation ID
  INTERVIEW_RESERVATION_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "면접 예약 ID는 null 혹은 empty일 수 없습니다."),
  INTERVIEW_RESERVATION_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "면접 예약 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // InterviewReservation Applicant
  INTERVIEW_RESERVATION_APPLICANT_NULL(HttpStatus.BAD_REQUEST, "면접 예약의 지원자는 null일 수 없습니다."),

  /** 면접 슬롯(InterviewSlot) 에러 코드 */
  // InterviewSlot ID
  INTERVIEW_SLOT_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "면접 슬롯 ID는 null 혹은 empty일 수 없습니다."),
  INTERVIEW_SLOT_INVALID_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "면접 슬롯 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // InterviewSlot Creator ID
  INTERVIEW_SLOT_CREATOR_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "면접 슬롯 생성자 ID는 null 혹은 empty일 수 없습니다."),
  INTERVIEW_SLOT_INVALID_CREATOR_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "면접 슬롯 생성자 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // InterviewSlot Announcement ID
  INTERVIEW_SLOT_ANNOUNCEMENT_ID_NULL_OR_EMPTY(HttpStatus.BAD_REQUEST, "면접 슬롯 공고 ID는 null 혹은 empty일 수 없습니다."),
  INTERVIEW_SLOT_INVALID_ANNOUNCEMENT_ID_FORMAT(
      HttpStatus.BAD_REQUEST, "면접 슬롯 공고 ID는 UUID 포멧을 준수해야 합니다.(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"),

  // InterviewSlot Max Number of People
  INTERVIEW_SLOT_MAX_NUMBER_OF_PEOPLE_NULL(HttpStatus.BAD_REQUEST, "면접 슬롯 최대 인원수는 null일 수 없습니다."),
  INTERVIEW_SLOT_INVALID_MAX_NUMBER_OF_PEOPLE_RANGE(HttpStatus.BAD_REQUEST, "면접 슬롯 최대 인원수는 1 이상 100 이하여야 합니다."),

  // InterviewSlot Period
  INTERVIEW_SLOT_PERIOD_NULL(HttpStatus.BAD_REQUEST, "면접 슬롯 기간은 null일 수 없습니다."),

  // InterviewSlot Reservations
  INTERVIEW_SLOT_RESERVATIONS_NULL(HttpStatus.BAD_REQUEST, "면접 슬롯 예약 리스트는 null일 수 없습니다.");

  private final HttpStatus httpStatus;
  private final String message;
}
