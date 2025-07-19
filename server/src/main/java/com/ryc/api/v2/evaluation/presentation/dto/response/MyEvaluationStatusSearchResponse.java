package com.ryc.api.v2.evaluation.presentation.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
    description =
        """
            로그인한 평가자가, 특정 지원자들 각각에 대해 평가를 수행했는지 여부를 반환하는 응답 DTO입니다.
            면접/지원서 평가 상태 조회 API 모두 해당 응답 DTO를 반환합니다.
            - List<MyApplicantEvaluationStatus> : 지원자 ID와 평가여부를 담은 객체 리스트
        """)
public record MyEvaluationStatusSearchResponse(
    @Schema(
            description = "지원자별 평가 여부 상태 리스트",
            example =
                """
                        [
                          {
                            "applicantId": "applicant-1",
                            "isEvaluated": true
                          },
                          {
                            "applicantId": "applicant-2",
                            "isEvaluated": false
                          }
                        ]
                        """)
        List<ApplicantEvaluationStatus> applicantEvaluationStatuses) {
  @Schema(description = "지원자별 로그인 평가자의 평가 여부 상태 DTO")
  public record ApplicantEvaluationStatus(
      @Schema(description = "지원자 ID", example = "applicant-1") String applicantId,
      @Schema(description = "로그인한 평가자가 평가를 완료했는지 여부", example = "true") boolean isEvaluated) {}
}
