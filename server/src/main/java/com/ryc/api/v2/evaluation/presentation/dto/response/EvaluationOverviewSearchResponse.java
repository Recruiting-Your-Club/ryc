package com.ryc.api.v2.evaluation.presentation.dto.response;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(description = "지원자 평가 요약(overview) 정보 응답 DTO")
public record EvaluationOverviewSearchResponse(
    @Schema(
            description = "지원자별 평가 요약(overview) 데이터 리스트",
            example =
                """
                    [
                      {
                        "applicantId": "applicant-001",
                        "completedEvaluatorCount": 3,
                        "totalEvaluatorCount": 5,
                        "averageScore": 4.3
                      }
                    ]
                    """)
        @NotNull(message = "overviewDataList shouldn't be null")
        List<@NotNull(message = "overviewDataList shouldn't be null") OverviewData>
            overviewDataList) {

  @Override
  public List<OverviewData> overviewDataList() {
    return List.copyOf(overviewDataList);
  }

  @Builder
  public record OverviewData(
      @Schema(description = "지원자 id", example = "applicant-001")
          @NotBlank(message = "applicantId shouldn't be blank")
          String applicantId,
      @Schema(description = "평가를 완료한 평가자 수", example = "3") int completedEvaluatorCount,
      @Schema(description = "전체 평가 대상 평가자 수", example = "5") int totalEvaluatorCount,
      @Schema(description = "지원자 평가 평균 점수", example = "4.3")
          @NotNull(message = "averageScore shouldn't be null")
          BigDecimal averageScore) {}
}
