package com.ryc.api.v1.member.domain;


/**
 * 현재는 USER 하나만 존재. 동아리 회장 및 동아리원 구분의 경우 추후 설정 예정
 *  A동아리 회장이 B동아리의 동아리원일 수도 있는 상황 -> 이에 대해 추후 설정으로 사용자 역할 재정의 필요
 */
public enum UserRole {
    USER
}
