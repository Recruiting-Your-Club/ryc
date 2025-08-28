package com.ryc.api.v2.applicant.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import lombok.Builder;

@Builder
public record ApplicantPersonalInfoCreateRequest(
    @NotNull(message = "지원자 개인정보 타입은 null값일 수 없습니다.")
        PersonalInfoQuestionType personalInfoQuestionType,
    @NotBlank(message = "지원자 개인정보 응답값은 빈 값일 수 없습니다.")
        // TODO: personalInfoQuestionType에 따라서 입력값 유효성 검증 필요
        String value) {}
