package com.ryc.api.v1.user.domain;


/**
 * 서비스 회원의 경우 부여되는 role = USER
 * 이외, 동아리 회장, 동아리원의 role은 ClubRole에서 별도로 관리한다.
 */
public enum UserRole {
    USER
}
