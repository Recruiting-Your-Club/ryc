package com.ryc.api.v2.application.presentation.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationGetResponse(
    @Schema(description = "지원자 ID", example = "2ef2b4c5c-8d4c-4c4c-8d4c-2eef2b4c5c4c")
        String applicantId,
    @Schema(description = "지원자 이름", example = "홍길동") String name,
    @Schema(description = "지원자 이메일", example = "gildong@example.com") String email,
    @Schema(description = "지원 상태", example = "DOCUMENT_PENDING") ApplicantStatus status,
    @Schema(description = "제출 일시", example = "2025-07-22T10:00:00") LocalDateTime submittedAt,
    @Schema(description = "프로필 이미지 파일 정보") FileGetResponse profileImage,
    @Schema(description = "추가 개인정보 목록") List<ApplicantPersonalInfoResponse> personalInfos,
    @Schema(description = "사전 질문 답변 목록") List<AnswerResponse> preQuestionAnswers,
    @Schema(description = "본 질문 답변 목록") List<AnswerResponse> applicationQuestionAnswers) {
  public static ApplicationGetResponse of(
      Applicant applicant,
      Application application,
      ApplicationForm applicationForm,
      Map<String, FileGetResponse> fileMap) {
    List<ApplicantPersonalInfoResponse> personalInfoResponses =
        applicant.getPersonalInfos().stream()
            .map(ApplicantPersonalInfoResponse::from)
            .collect(Collectors.toList());

    String profileFileId =
        applicant.getPersonalInfos().stream()
            .filter(pi -> pi.getQuestionType() == PersonalInfoQuestionType.PROFILE_IMAGE)
            .map(ApplicantPersonalInfo::getValue)
            .filter(v -> v != null && !v.isBlank())
            .findFirst()
            .orElse(null);
    FileGetResponse profileFile = profileFileId == null ? null : fileMap.get(profileFileId);

    Map<String, Question> preQuestionMap =
        applicationForm.getPreQuestions().stream()
            .collect(Collectors.toMap(Question::getId, Function.identity()));

    Map<String, Question> applicationQuestionMap =
        applicationForm.getApplicationQuestions().stream()
            .collect(Collectors.toMap(Question::getId, Function.identity()));

    List<AnswerResponse> preQuestionAnswers =
        application.getAnswers().stream()
            .filter(answer -> preQuestionMap.containsKey(answer.getQuestionId()))
            .map(
                answer ->
                    AnswerResponse.of(answer, preQuestionMap.get(answer.getQuestionId()), fileMap))
            .toList();

    List<AnswerResponse> applicationQuestionAnswers =
        application.getAnswers().stream()
            .filter(answer -> applicationQuestionMap.containsKey(answer.getQuestionId()))
            .map(
                answer ->
                    AnswerResponse.of(
                        answer, applicationQuestionMap.get(answer.getQuestionId()), fileMap))
            .toList();

    return ApplicationGetResponse.builder()
        .applicantId(applicant.getId())
        .name(applicant.getName())
        .email(applicant.getEmail())
        .status(applicant.getStatus())
        .submittedAt(application.getCreatedAt())
        .profileImage(profileFile)
        .personalInfos(personalInfoResponses)
        .preQuestionAnswers(preQuestionAnswers)
        .applicationQuestionAnswers(applicationQuestionAnswers)
        .build();
  }
}
