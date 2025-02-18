package com.ryc.api.v1.common.dto;

import jakarta.validation.constraints.NotEmpty;

/**
 * @param clubId Api 요청시 동아리 내 권한 확인시 필요한 데이터 값(clubId) 전달 DTO
 */
public record ClubRoleSecuredDto(@NotEmpty(message = "clubId shouldn't be empty") String clubId) {}
