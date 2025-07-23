package com.ryc.api.v2.application.presentation.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.applicationForm.domain.QuestionOption;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationGetResponse(
    @Schema(description = "지원자 ID", example = "2ef2b4c5c-8d4c-4c4c-8d4c-2eef2b4c5c4c")
        String applicantId,
    @Schema(description = "지원자 이름", example = "홍길동") String name,
    @Schema(description = "지원자 이메일", example = "gildong@example.com") String email,
    @Schema(description = "지원 상태", example = "PENDING") ApplicantStatus status,
    @Schema(description = "제출 일시", example = "2025-07-22T10:00:00") LocalDateTime submittedAt,
    @Schema(description = "추가 개인정보 목록") List<ApplicantPersonalInfoResponse> personalInfos,
    @Schema(description = "답변 목록") List<AnswerResponse> answers) {
  public static ApplicationGetResponse of(
      Applicant applicant, Application application, ApplicationForm applicationForm) {
    List<ApplicantPersonalInfoResponse> personalInfoResponses =
        applicant.getPersonalInfos().stream()
            .map(ApplicantPersonalInfoResponse::from)
            .collect(Collectors.toList());

    Map<String, Question> questionMap =
        Stream.concat(
                applicationForm.getApplicationQuestions().stream(),
                applicationForm.getPreQuestions().stream())
            .collect(Collectors.toMap(Question::getId, Function.identity()));

    Map<String, QuestionOption> optionMap =
        Stream.concat(
                applicationForm.getApplicationQuestions().stream(),
                applicationForm.getPreQuestions().stream())
            .flatMap(q -> q.getOptions().stream())
            .collect(Collectors.toMap(QuestionOption::getId, Function.identity()));

    List<AnswerResponse> answerResponses =
        application.getAnswers().stream()
            .map(
                answer ->
                    AnswerResponse.of(answer, questionMap.get(answer.getQuestionId()), optionMap))
            .collect(Collectors.toList());

    return ApplicationGetResponse.builder()
        .applicantId(applicant.getId())
        .name(applicant.getName())
        .email(applicant.getEmail())
        .status(applicant.getStatus())
        .submittedAt(application.getCreatedAt()) // Assuming Application has createdAt
        .personalInfos(personalInfoResponses)
        .answers(answerResponses)
        .build();
  }
}
