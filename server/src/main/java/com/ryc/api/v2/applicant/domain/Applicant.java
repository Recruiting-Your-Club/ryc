package com.ryc.api.v2.applicant.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantCreateRequest;
import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Applicant {

  private final String id;
  private final String announcementId;

  // 개인 필수 정보
  private final String email;
  private final String name;
  private final ApplicantStatus status;

  // 이름, 이메일 제외 개인정보 질문 저장
  private final List<ApplicantPersonalInfo> personalInfos;

  public static Applicant initialize(ApplicantCreateRequest request, String announcementId) {
    List<ApplicantPersonalInfo> personalInfos =
        request.personalInfos().stream().map(ApplicantPersonalInfo::initialize).toList();

    return Applicant.builder()
        .name(request.name())
        .announcementId(announcementId)
        .email(request.email())
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .personalInfos(personalInfos)
        .status(ApplicantStatus.DOCUMENT_PENDING)
        .build();
  }

  public Applicant updateStatus(ApplicantStatus status) {
    return Applicant.builder()
        .id(this.id)
        .announcementId(this.announcementId)
        .email(this.email)
        .name(this.name)
        .status(status)
        .personalInfos(this.personalInfos)
        .build();
  }

  public void checkBusinessRules(ApplicationForm applicationForm) {
    Set<PersonalInfoQuestionType> requiredTypes =
        applicationForm.getPersonalInfoQuestionTypes().stream()
            .filter(
                type ->
                    type != PersonalInfoQuestionType.NAME && type != PersonalInfoQuestionType.EMAIL)
            .collect(Collectors.toSet());

    Set<PersonalInfoQuestionType> providedTypes =
        personalInfos.stream()
            .map(ApplicantPersonalInfo::getQuestionType)
            .collect(Collectors.toCollection(HashSet::new));

    if (!providedTypes.containsAll(requiredTypes)) {
      throw new BusinessRuleException(
          ApplicationCreateErrorCode.MISSING_REQUIRED_PERSONAL_INFO_ANSWER);
    }

    for (ApplicantPersonalInfo personalInfo : personalInfos) {
      if (personalInfo.getQuestionType() == PersonalInfoQuestionType.NAME
          || personalInfo.getQuestionType() == PersonalInfoQuestionType.EMAIL) {
        throw new BusinessRuleException(ApplicationCreateErrorCode.DUPLICATE_PERSONAL_INFO_ANSWER);
      }
    }
  }
}
