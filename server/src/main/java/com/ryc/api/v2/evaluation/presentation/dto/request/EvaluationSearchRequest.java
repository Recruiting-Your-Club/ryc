package com.ryc.api.v2.evaluation.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
    description =
        """
        다수의 지원자에 대한 지원서/면접 평가 결과들을 조회하기 위한 요청 DTO입니다.
        해당 DTO는 지원서/면접 평가에 대한 전체 데이터 조회(즉, 평가 데이터, 평점, 평가자 데이터 포함) API에서 응답 값으로 사용되며,
        또한, 지원서/면접 평가에 대한 평가 개요(overview) 정보 조회 API의 응답 값으로도 사용됩니다.
        - applicantIdList : 평가 결과를 조회할 지원자 ID 목록
        """)
public record EvaluationSearchRequest(
    @Schema(description = "동아리내 평가권한을 가진 인원 수를 조회하기 위한 동아리 ID")
        @NotBlank(message = "clubId shouldn't be blank")
        String clubId,
    @Schema(
            description = "평가 결과를 조회할 지원자 ID 목록",
            example = "[\"applicant-1\", \"applicant-2\", \"applicant-3\"]")
        @Size(min = 1, message = "applicantIdList는 적어도 하나 이상의 id를 포함해야 합니다.")
        @NotNull(message = "applicantIdList shouldn't be null")
        List<@NotBlank(message = "Each applicantId shouldn't be blank") String> applicantIdList) {

  @Override
  public List<String> applicantIdList() {
    return List.copyOf(applicantIdList);
  }
}
