package com.ryc.api.v2.common.aop.dto;

/** 클럽 역할에 대한 보안 정보 DTO, 클럽의 관리자 ID와 클럽 ID를 포함합니다. */
public record ClubRoleSecuredDto(String adminId, String clubId) {}
