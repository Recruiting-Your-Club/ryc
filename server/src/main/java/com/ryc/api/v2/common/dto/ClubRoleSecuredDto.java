package com.ryc.api.v2.common.dto;

/**
 * 클럽 역할에 대한 보안 정보 DTO
 * Asepct or Service에서 사용되며, 클럽의 관리자 ID와 클럽 ID를 포함합니다.
 */
public record ClubRoleSecuredDto(String adminId, String clubId) {}
