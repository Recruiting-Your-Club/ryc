package com.ryc.api.v2.evaluation.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
    description =
        """
                    특정 지원자들의 평가 여부 상태를 조회하기 위한 요청 DTO입니다. 지원서/면접 API 모두 동일하게 현 DTO를 사용합니다.
                    해당 DTO를 요청 값으로 받는 API는, 로그인한 평가자가 주어진 applicantId 목록에 대해
                    각 지원자별로 평가를 수행했는지 여부를 확인합니다.

                    - applicantIdList: 조회할 지원자 ID들의 리스트
                """)
public record MyEvaluationStatusSearchRequest(
    @Schema(
            description = "평가 여부 상태를 조회할 대상 지원자들의 ID 목록",
            example = "[\"applicant-1\", \"applicant-2\", \"applicant-3\"]")
        @Size(min = 1, message = "applicantIdList는 적어도 하나 이상의 id를 포함해야 합니다.")
        @NotNull(message = "applicantIdList shouldn't be null")
        List<@NotBlank(message = "Each applicantId shouldn't be blank") String> applicantIdList) {

  @Override
  public List<String> applicantIdList() {
    return List.copyOf(applicantIdList);
  }
}
