package com.ryc.api.v2.evaluation.presentation.dto.response;

import java.math.BigDecimal;
import java.util.List;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(
        description =
                """
                                지원서 및 면접 평가 결과 조회 공통 응답 DTO입니다.
                                이 DTO는 두 가지 별도 API에서 동일한 응답 구조를 사용하지만, 요청한 평가 유형에 따라 반환되는 실제 데이터는 다릅니다.
                                또한, 해당 응답 DTO 단일 객체 내에는 지원서 평가데이터와 면접 평가데이터는 공존하지 않습니다.(25.07.14 조상준)
                                /evaluation/application/search -> 지원서 평가 결과 반환
                                /evaluation/interview/search -> 면접 평가 결과 반환
                       
                        """,
        example =
                """
                        {
                          "evaluationsOfApplicants": [
                            {
                              "applicantId": "applicant-001",
                              "completedEvaluatorCount": 3,
                              "totalEvaluatorCount": 5,
                              "averageScore": 4.3,
                              "evaluationDetails": [
                                {
                                  "evaluationId": "evaluation-123",
                                  "evaluatorId": "admin-123",
                                  "evaluatorName": "조상준",
                                  "evaluatorImage": "https://example.com/profile1.jpg",
                                  "isEvaluatorImagePresent": true,
                                  "score": 4.5,
                                  "comment": "지원서를 읽고 감명 받았습니다.",
                                  "evaluationType": "APPLICATION",
                                  "isMyEvaluation": true
                                },
                                {
                                  "evaluationId": "evaluation-456",
                                  "evaluatorId": "admin-456",
                                  "evaluatorName": "홍길동",
                                  "evaluatorImage": null,
                                  "isEvaluatorImagePresent": false,
                                  "score": 4.0,
                                  "comment": "내용이 충실합니다.",
                                  "evaluationType": "APPLICATION",
                                  "isMyEvaluation": false
                                }
                              ]
                            }
                          ]
                        }
                        """)
public record EvaluationSearchResponse(
        @Schema(description = "지원자별 평가 정보 Map (Key = applicantId, Value = 평가 정보)")
        List<EvaluationsOfApplicant> evaluationsOfApplicants) {

    @Builder
    public record EvaluationsOfApplicant(
            @Schema(description = "지원자 id", example = "3") String applicantId,
            @Schema(description = "평가를 완료한 평가자 수", example = "3") int completedEvaluatorCount,
            @Schema(description = "전체 평가 대상 평가자 수", example = "5") int totalEvaluatorCount,
            @Schema(description = "지원자 평가 평균 점수", example = "4.3") BigDecimal averageScore,
            @ArraySchema(
                    arraySchema = @Schema(description = "평가 데이터 리스트"),
                    schema = @Schema(implementation = EvaluationDetail.class))
            List<EvaluationDetail> evaluationDetails) {
    }

    @Builder
    public record EvaluationDetail(
            @Schema(description = "평가 ID", example = "evaluation-123") String evaluationId,
            @Schema(description = "평가자 ID", example = "admin-123") String evaluatorId,
            @Schema(description = "평가자 이름", example = "조상준") String evaluatorName,
            @Schema(description = "평가자 프로필 이미지", example = "조상준") String evaluatorImage,
            @Schema(description = "평가자 프로필 존재여부", example = "조상준") boolean isEvaluatorImagePresent,
            @Schema(description = "평가 점수", example = "4.5") BigDecimal score,
            @Schema(description = "평가 코멘트", example = "지원서를 읽고 감명 받았습니다.") String comment,
            @Schema(description = "평가 타입 (APPLICATION, INTERVIEW 등)", example = "APPLICATION")
            String evaluationType,
            @Schema(description = "현재 로그인 사용자의 평가 여부", example = "true") boolean isMyEvaluation) {
    }
}
